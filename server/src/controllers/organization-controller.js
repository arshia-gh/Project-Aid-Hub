import Organization from '../models/Organization.js';
import ApiError from '../utils/errors.js';

export async function getOrganizations() {
	return await Organization.findAll();
}

export async function findOrganizationByPk(orgId, transaction) {
	const foundOrganization = await Organization.findByPk(orgId, {
		transaction,
	});

	if (foundOrganization == null) {
		throw ApiError.notFound(
			`Organization with id of ${orgId} does not exist`
		);
	}

	return foundOrganization;
}

export async function getOrganizationById(orgId) {
	return (await findOrganizationByPk(orgId)).toJSON();
}

export async function createOrganization(organization) {
	return Organization.create(organization);
}
