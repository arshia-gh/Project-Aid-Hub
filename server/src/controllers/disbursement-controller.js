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
			...appealAggregateOption,
		});

		if (foundAppeal.get('outcome') === 'ended') {
			throw ApiError.badRequest(
				'Disbursement cannot be recorded for an inactive appeal'
			);
		}

		if (foundAppeal.get('outcome') === 'collecting') {
			await (
				await findAppealByPk(appealId, { transaction: t })
			).update({ outcome: 'disbursing' }, { transaction: t });
		}

		if (foundAppeal.fromDate > disbursement.disbursementDate) {
			throw ApiError.badRequest(
				'Disbursement date must be greater than appeal starting date'
			);
		}

		const totalCashAmount = parseFloat(foundAppeal.get('donatedCash') ?? 0);
		const totalGoodsValue = parseFloat(
			foundAppeal.get('donatedGoods') ?? 0
		);
		const totalDisbursedAmount = parseFloat(
			foundAppeal.get('disbursedAmount') ?? 0
		);

		const availableAmount =
			totalCashAmount + totalGoodsValue - totalDisbursedAmount;

		if (availableAmount < disbursement.amount) {
			throw ApiError.badRequest(
				'Disbursement amount must be less than or equal to the contributed amount'
			);
		}

		const foundApplicant = await findApplicantByIDno(disbursement.IDno, t);

		if (foundAppeal.orgId !== foundAppeal.get('orgId')) {
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
