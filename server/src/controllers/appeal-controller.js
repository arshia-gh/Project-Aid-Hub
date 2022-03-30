import { Op } from '@sequelize/core';
import Appeal from '../models/Appeal.js';
import Disbursement from '../models/Disbursement.js';
import sequelize from '../sequelize.js';
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

export async function getAppeals(show) {
	if (show == 'current') {
		return Appeal.findAll({
			where: {
				toDate: {
					[Op.gt]: new Date().toISOString(),
				},
			},
		});
	} else if (show == 'past') {
		return Appeal.findAll({
			where: {
				toDate: {
					[Op.lte]: new Date().toISOString(),
				},
			},
		});
	} else {
		return Appeal.findAll();
	}
}

export async function findAppealByPk(appealId, transaction) {
	const foundAppeal = await Appeal.findByPk(appealId, { transaction });

	if (foundAppeal == null) {
		throw ApiError.notFound(`Appeal with id of ${appealId} does not exist`);
	}

	return foundAppeal;
}

export async function getTotalDisbursedAmount(appealId, transaction) {
	return Disbursement.sum('amount', {
		where: {
			appealId,
		},
		raw: true,
		transaction,
	});
}

export async function getAppealById(appealId) {
	return findAppealByPk(appealId);
}

export async function updateAppealOutcome(appealId, newOutcomes) {
	return sequelize.transaction(async (t) => {
		const foundAppeal = await findAppealByPk(appealId, t);
		return foundAppeal.update({ outcome: newOutcomes }, { transaction: t });
	});
}
