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
