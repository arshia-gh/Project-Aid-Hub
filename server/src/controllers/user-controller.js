import { faker } from '@faker-js/faker';
import _ from 'lodash';
import User, { getNextUserId } from '../models/User.js';
import sequelize from '../sequelize.js';
import ApiError from '../utils/errors.js';
import { findOrganizationByPk } from './organization-controller.js';

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
	orgRepresentative.password = faker.internet.password(12, true);

	const foundOrganization = await findOrganizationByPk(orgId);
	const createdRep = await foundOrganization.createRepresentative(
		orgRepresentative
	);
	return toSafeUser(createdRep);
}

export async function createApplicant(applicant, orgId) {
	applicant.password = faker.internet.password(12, true);

	return sequelize.transaction(async (transaction) => {
		const foundOrganization = await findOrganizationByPk(
			orgId,
			transaction
		);

		const nextUserId = await getNextUserId(transaction);
		applicant.username = generateUsername(nextUserId);

		const createdApplicant = await foundOrganization.createApplicant(
			applicant,
			{
				transaction,
			}
		);

		return toSafeUser(createdApplicant);
	});
}

export async function login(username, password) {
	const foundUser = await User.findOne({
		where: {
			username,
			password,
		},
	});

	if (!foundUser) {
		throw ApiError.unauthorized(
			'Invalid login credentials, please try again'
		);
	}

	return toSafeUser(foundUser);
}
