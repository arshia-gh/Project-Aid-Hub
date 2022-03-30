import Contribution from '../models/Contribution.js';
import sequelize from '../sequelize.js';
import ApiError from '../utils/errors.js';
import { findAppealByPk } from './appeal-controller.js';

export async function recordGoods(goods, appealId) {
	return sequelize.transaction(async (t) => {
		const foundAppeal = await findAppealByPk(appealId, t);

		if (foundAppeal.outcome === 'ended') {
			ApiError.badRequest(
				'Contribution cannot be recorded for an inactive appeal'
			);
		}

		return foundAppeal.createGood(
			{
				...goods,
				contributionType: 'GOODS',
			},
			t
		);
	});
}

export async function recordCashDonation(cashDonation, appealId) {
	return sequelize.transaction(async (t) => {
		const foundAppeal = await findAppealByPk(appealId, t);

		if (foundAppeal.outcome === 'ended') {
			ApiError.badRequest(
				'Contribution cannot be recorded for an inactive appeal'
			);
		}

		return foundAppeal.createCashDonation(
			{
				...cashDonation,
				contributionType: 'CASH_DONATION',
			},
			t
		);
	});
}

export async function getAllGoods(appealId) {
	const foundAppeal = await findAppealByPk(appealId);
	return foundAppeal.getGoods();
}

export async function getCashDonations(appealId) {
	const foundAppeal = await findAppealByPk(appealId);
	return foundAppeal.getCashDonations();
}

export async function getContributions(appealId) {
	return Contribution.findAll({ where: { appealId } });
}

export async function getTotalDonatedCash(appealId, transaction) {
	return Contribution.sum('amount', {
		where: {
			appealId,
			contributionType: 'CASH_DONATION',
		},
		raw: true,
		transaction,
	});
}

export async function getTotalGoodsValue(appealId, transaction) {
	return Contribution.sum('estimatedValue', {
		where: {
			appealId,
			contributionType: 'GOODS',
		},
		raw: true,
		transaction,
	});
}
