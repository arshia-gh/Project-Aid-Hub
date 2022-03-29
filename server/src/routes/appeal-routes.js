import express from 'express';
import { getAppealById, getAppeals } from '../controllers/appeal-controller.js';
import {
	getAllGoods,
	getCashDonations,
	getContributions,
	recordCashDonation,
	recordGoods,
} from '../controllers/contribution-controller.js';

import { promisify, validator } from '../middleware/utils-middleware.js';
import cashDonationsSchema from '../schemas/cash-donations-schema.js';
import goodsSchema from '../schemas/goods-schema.js';

const router = express.Router();

router.get(
	'/',
	promisify(async (req, res) => {
		const appeals = await getAppeals();
		res.status(200).json({
			result: appeals,
			code: 200,
		});
	})
);

router.get(
	'/:appealId',
	promisify(async (req, res) => {
		const { appealId } = req.params;
		const foundAppeal = await getAppealById(appealId);

		res.status(200).json({
			result: foundAppeal,
			code: 200,
		});
	})
);

router.post(
	'/:appealId/goods',
	validator.body(goodsSchema),
	promisify(async (req, res) => {
		const { appealId } = req.params;
		const createdGoods = await recordGoods(req.body, appealId);

		res.status(200).json({
			result: createdGoods,
			code: 200,
		});
	})
);

router.post(
	'/:appealId/cash-donations',
	validator.body(cashDonationsSchema),
	promisify(async (req, res) => {
		const { appealId } = req.params;
		const createdCashDonation = await recordCashDonation(
			req.body,
			appealId
		);

		res.status(200).json({
			result: createdCashDonation,
			code: 200,
		});
	})
);

router.get(
	'/:appealId/goods',
	promisify(async (req, res) => {
		const { appealId } = req.params;
		const goods = await getAllGoods(appealId);

		res.status(200).json({
			result: goods,
			code: 200,
		});
	})
);

router.get(
	'/:appealId/cash-donations',
	promisify(async (req, res) => {
		const { appealId } = req.params;
		const cashDonations = await getCashDonations(appealId);

		res.status(200).json({
			result: cashDonations,
			code: 200,
		});
	})
);

router.get(
	'/:appealId/contributions',
	promisify(async (req, res) => {
		const { appealId } = req.params;
		const contributions = await getContributions(appealId);

		res.status(200).json({
			result: contributions,
			code: 200,
		});
	})
);

export default router;
