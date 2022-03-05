import express from 'express';

import { promisify, validator } from '../middleware/utils-middleware.js';
import {
	getApplicants,
	createApplicant,
} from '../controller/user-controller.js';
import ApplicantSchema from '../schemas/applicant-schema.js';

const router = express.Router({ mergeParams: true });

router.get(
	'/',
	promisify(async (req, res) => {
		const { orgId } = req.params;
		const applicants = await getApplicants(orgId);

		res.status(200).json({
			result: applicants,
			code: 200,
		});
	})
);

router.post(
	'/',
	validator.body(ApplicantSchema),
	promisify(async (req, res) => {
		const { orgId } = req.params;
		const createdApplicant = await createApplicant(req.body, orgId);

		res.status(200).json({
			result: createdApplicant,
			code: 200,
		});
	})
);

export default router;
