import { Op } from '@sequelize/core';
import Appeal from '../models/Appeal.js';
import Organization from '../models/Organization.js';
import sequelize from '../sequelize.js';
import ApiError from '../utils/errors.js';
import { findOrganizationByPk } from './organization-controller.js';

export const appealAggregateOption = {
	attributes: [
		'id',
		'title',
		'description',
		'targetAmount',
		'outcome',
		'toDate',
		'fromDate',
		[
			sequelize.literal(`(
				SELECT COALESCE(SUM(amount), 0) 
				FROM Disbursements 
				WHERE appealId = Appeal.id
			)`),
			'disbursedAmount',
		],
		[
			sequelize.literal(`(
					SELECT 
						COALESCE(SUM(amount), 0)
					FROM Contributions 
					WHERE appealId = Appeal.id
				)`),
			'donatedCash',
		],
		[
			sequelize.literal(`(
					SELECT 
						COALESCE(SUM(estimatedValue), 0)
					FROM Contributions 
					WHERE appealId = Appeal.id
				)`),
			'donatedGoods',
		],
	],
	include: [Organization],
};

export async function organizeAppeal(appeal, orgId) {
	const foundOrg = await findOrganizationByPk(orgId);
	return foundOrg.createAppeal({
		...appeal,
		outcome: 'collecting',
	});
}

export async function getOrganizationAppeals(orgId) {
	const foundOrg = await findOrganizationByPk(orgId);
	return foundOrg.getAppeals(appealAggregateOption);
}

export async function getAppeals(show) {
	if (show == 'current') {
		return Appeal.findAll({
			where: {
				toDate: {
					[Op.gt]: new Date().toISOString(),
				},
			},
			...appealAggregateOption,
		});
	} else if (show == 'past') {
		return Appeal.findAll({
			where: {
				toDate: {
					[Op.lte]: new Date().toISOString(),
				},
			},
			...appealAggregateOption,
		});
	} else {
		return Appeal.findAll(appealAggregateOption);
	}
}

export async function findAppealByPk(appealId, options) {
	const foundAppeal = await Appeal.findByPk(appealId, options);

	if (foundAppeal == null) {
		throw ApiError.notFound(`Appeal with id of ${appealId} does not exist`);
	}

	return foundAppeal;
}

export async function getAppealById(appealId) {
	return findAppealByPk(appealId, appealAggregateOption);
}

export async function updateAppealOutcome(appealId, newOutcomes) {
	return sequelize.transaction(async (t) => {
		const foundAppeal = await findAppealByPk(appealId, { transaction: t });
		return foundAppeal.update({ outcome: newOutcomes }, { transaction: t });
	});
}
