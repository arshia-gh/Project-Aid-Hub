import { faker } from '@faker-js/faker';
import _ from 'lodash';
import User, { getNextUserId } from '../models/User.js';
import sequelize from '../sequelize.js';
import ApiError from '../utils/errors.js';
import {
	generateApplicantUsername,
	generateRepresentativeUsername,
} from '../utils/utils.js';
import { findOrganizationByPk } from './organization-controller.js';

import bcrypt from 'bcrypt';
import { sendCredentials } from '../nodemailer.js';
import Organization from '../models/Organization.js';

const toSafeUser = (user) => {
	return _.omitBy(_.omit(user.toJSON(), ['id', 'password']), _.isNil);
};

export async function getOrgRepresentatives(orgId) {
	const foundOrganization = await findOrganizationByPk(orgId);
	return (await foundOrganization.getRepresentatives()).map(toSafeUser);
}

export async function getApplicants(orgId) {
	const foundOrganization = await findOrganizationByPk(orgId);
	return (await foundOrganization.getApplicants()).map(toSafeUser);
}

export async function createOrgRepresentative(orgRepresentative, orgId) {
	const createdRep = await sequelize.transaction(async (transaction) => {
		const foundOrganization = await findOrganizationByPk(
			orgId,
			transaction
		);

		const password = faker.internet.password(12, true);
		const hashedPassword = await bcrypt.hash(password, 10);
		const username = generateRepresentativeUsername(
			orgRepresentative.username
		);

		const createdAccount = await foundOrganization.createRepresentative(
			{
				...orgRepresentative,
				username,
				password: hashedPassword,
			},
			{ transaction }
		);

		await sendCredentials({ password, username }, orgRepresentative.email);

		return createdAccount;
	});

	return toSafeUser(createdRep);
}

export async function createApplicant(applicant, orgId) {
	return sequelize.transaction(async (transaction) => {
		const foundOrganization = await findOrganizationByPk(
			orgId,
			transaction
		);

		const nextUserId = await getNextUserId(transaction);

		const password = faker.internet.password(12, true);
		const hashedPassword = await bcrypt.hash(password, 10);
		const username = generateApplicantUsername(nextUserId);

		const createdApplicant = await foundOrganization.createApplicant(
			{
				...applicant,
				username,
				password: hashedPassword,
			},
			{
				transaction,
			}
		);

		if (applicant.email != null) {
			await sendCredentials({ password, username }, applicant.email);
		}

		return { ...toSafeUser(createdApplicant), password };
	});
}

export async function findApplicantByIDno(IDno, transaction) {
	const foundApplicant = await User.findOne(
		{
			where: {
				IDno,
			},
		},
		{ transaction }
	);

	if (foundApplicant == null) {
		throw ApiError.notFound(
			`Applicant with id number of ${IDno} does not exist`
		);
	}

	return toSafeUser(foundApplicant);
}

export async function login(username, password) {
	const foundUser = await User.findOne({
		where: {
			username,
		},
		include: [Organization],
	});

	if (foundUser == null) {
		throw ApiError.unauthorized('invalid username, please try again');
	}

	if (await bcrypt.compare(password, foundUser.getDataValue('password'))) {
		return toSafeUser(foundUser);
	}

	throw ApiError.unauthorized('invalid password, please try again');
}
