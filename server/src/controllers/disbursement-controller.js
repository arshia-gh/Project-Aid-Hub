import sequelize from '../sequelize.js';
import ApiError from '../utils/errors.js';
import { findAppealByPk, appealAggregateOption } from './appeal-controller.js';
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
		const foundAppeal = await findAppealByPk(appealId, {
			transaction: t,
			appealAggregateOption,
		});

		if (foundAppeal.outcome === 'ended') {
			throw ApiError.badRequest(
				'Disbursement cannot be recorded for an inactive appeal'
			);
		}

		if (foundAppeal.outcome === 'collecting') {
			foundAppeal.update({ outcome: 'disbursing' }, { transaction: t });
		}

		if (foundAppeal.fromDate > disbursement.disbursementDate) {
			throw ApiError.badRequest(
				'Disbursement date must be greater than appeal starting date'
			);
		}

		const totalCashAmount = foundAppeal.donatedCash ?? 0;
		const totalGoodsValue = foundAppeal.donatedGoods ?? 0;
		const totalDisbursedAmount = foundAppeal.disbursedAmount ?? 0;

		const availableAmount =
			totalCashAmount + totalGoodsValue - totalDisbursedAmount;

		if (availableAmount < disbursement.amount) {
			throw ApiError.badRequest(
				'Disbursement amount must be less than or equal to the contributed amount'
			);
		}

		const foundApplicant = await findApplicantByIDno(disbursement.IDno, t);

		if (foundAppeal.orgId !== foundApplicant.orgId) {
			throw ApiError.badRequest(
				"Appeal's organization must be the same as Applicant's organization"
			);
		}

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
