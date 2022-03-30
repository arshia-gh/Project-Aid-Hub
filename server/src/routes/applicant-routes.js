import express from 'express';
import { getApplicantDisbursements } from '../controllers/disbursement-controller.js';
import { promisify } from '../middleware/utils-middleware.js';

const router = express.Router();

router.get(
	'/:IDno/disbursements',
	promisify(async (req, res) => {
		const { IDno } = req.params;
		const disbursements = await getApplicantDisbursements(IDno);

		res.status(200).json({
			result: disbursements,
			code: 200,
		});
	})
);

export default router;
