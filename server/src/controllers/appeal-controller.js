import { Op } from '@sequelize/core';
import Appeal from '../models/Appeal.js';
import Contribution from '../models/Contribution.js';
import Disbursement from '../models/Disbursement.js';
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
			sequelize.fn('SUM', sequelize.col('CashDonations.amount')),
			'donatedCash',
		],
		[
			sequelize.fn('SUM', sequelize.col('Disbursements.amount')),
			'disbursedAmount',
		],
		[sequelize.fn('SUM', sequelize.col('Goods.amount')), 'estimatedValue'],
	],
	include: [
		{
			model: Contribution,
			attributes: [],
			as: 'cashDonations',
		},
		{
			model: Contribution,
			attributes: [],

			as: 'goods',
		},
		{
			model: Disbursement,
			attributes: [],
		},
	],
	group: ['id'],
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
	return findAppealByPk(appealId, appealAggregateOption);
}

export async function updateAppealOutcome(appealId, newOutcomes) {
	return sequelize.transaction(async (t) => {
		const foundAppeal = await findAppealByPk(appealId, { transaction: t });
		return foundAppeal.update({ outcome: newOutcomes }, { transaction: t });
	});
}
