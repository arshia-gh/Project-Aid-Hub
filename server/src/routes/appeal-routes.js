import express from 'express';
import { getAppeals } from '../controllers/appeal-controller.js';
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

export default router;
