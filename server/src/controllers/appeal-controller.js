import Appeal from '../models/Appeal.js';
import ApiError from '../utils/errors.js';
import { findOrganizationByPk } from './organization-controller.js';

export async function organizeAppeal(appeal, orgId) {
	const foundOrg = await findOrganizationByPk(orgId);
	return foundOrg.createAppeal({
		...appeal,
		outcome: 'collecting',
	});
}

export async function getOrganizationAppeals(orgId) {
	const foundOrg = await findOrganizationByPk(orgId);
	return foundOrg.getAppeals();
}

export async function getAppeals() {
	return Appeal.findAll();
}
