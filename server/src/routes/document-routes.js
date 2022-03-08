/*
 * --IMPORTANT--
 * document router must be used with the applicant router,
 * all routes require the param `username` to exist on the request object
 */

import express from 'express';

import { promisify, validator } from '../middleware/utils-middleware.js';
import DocumentSchema from '../schemas/document-schema.js';

const router = express.Router({ mergeParams: true });

router.get(
	'/',
	promisify(async (req, res) => {
		const { username } = req.params;
	})
);

router.get(
	'/:documentId',
	promisify(async (req, res) => {
		const { username, documentId } = req.params;

		res.status(200).json({
			result: applicants,
			code: 200,
		});
	})
);

router.post(
	'/',
	validator.body(DocumentSchema),
	promisify(async (req, res) => {
		const { username } = req.params;

		res.status(200).json({
			result: createdApplicant,
			code: 200,
		});
	})
);

export default router;
