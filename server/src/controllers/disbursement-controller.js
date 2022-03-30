import sequelize from '../sequelize.js';
import ApiError from '../utils/errors.js';
import {
	findAppealByPk,
	getTotalDisbursedAmount,
} from './appeal-controller.js';
import {
	getTotalDonatedCash,
	getTotalGoodsValue,
} from './contribution-controller.js';
import { findApplicantByIDno } from './user-controller.js';

export async function getAppealDisbursements(appealId) {
	const foundAppeal = await findAppealByPk(appealId);
	return foundAppeal.getDisbursements();
}

export async function getApplicantDisbursements(IDno) {
	const foundApplicant = await findApplicantByIDno(IDno);
	return foundApplicant.getDisbursements();
}

export async function recordDisbursements(disbursement, appealId) {
	return sequelize.transaction(async (t) => {
		const foundAppeal = await findAppealByPk(appealId, t);

		if (foundAppeal.outcome === 'ended') {
			ApiError.badRequest(
				'Disbursement cannot be recorded for an inactive appeal'
			);
		}

		if (foundAppeal.outcome === 'collecting') {
			foundAppeal.update({ outcome: 'disbursing' }, { transaction: t });
		}

		if (foundAppeal.fromDate < disbursement.disbursementDate) {
			ApiError.badRequest(
				'Disbursement date must be greater than appeal starting date'
			);
		}

		const totalCash = (await getTotalDonatedCash(appealId, t)) ?? 0;
		const totalGoodsValue = (await getTotalGoodsValue(appealId, t)) ?? 0;
		const totalDisbursedAmount =
			(await getTotalDisbursedAmount(appealId, t)) ?? 0;

		const availableAmount =
			totalCash + totalGoodsValue - totalDisbursedAmount;

		if (availableAmount < disbursement.amount) {
			throw ApiError.badRequest(
				'Disbursement amount must be less than or equal to the contributed amount'
			);
		}

		const foundApplicant = await findApplicantByIDno(disbursement.IDno, t);
		return foundAppeal.createDisbursement(
			{
				...disbursement,
				userId: foundApplicant.id,
				appealId,
			},
			{ transaction: t }
		);
	});
}
