import express from 'express';
import { getAppealById, getAppeals } from '../controllers/appeal-controller.js';
import { promisify } from '../middleware/utils-middleware.js';

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

export default router;
