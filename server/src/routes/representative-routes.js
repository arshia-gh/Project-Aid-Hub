/*
 * --IMPORTANT--
 * representative router must be used with the organization router,
 * all routes require the param `orgId` to exist on the request object
 */

import express from 'express';
import {
	createOrgRepresentative,
	getOrgRepresentatives,
} from '../controllers/user-controller.js';

import { promisify, validator } from '../middleware/utils-middleware.js';
import OrgRepresentative from '../schemas/representative-schema.js';

const router = express.Router({ mergeParams: true });

router.get(
	'/',
	promisify(async (req, res) => {
		const { orgId } = req.params;
		const representatives = await getOrgRepresentatives(orgId);

		res.status(200).json({
			result: representatives,
			code: 200,
		});
	})
);

router.post(
	'/',
	validator.body(OrgRepresentative),
	promisify(async (req, res) => {
		const { orgId } = req.params;
		const createdOrgRepresentative = await createOrgRepresentative(
			req.body,
			orgId
		);

		res.status(200).json({
			result: createdOrgRepresentative,
			code: 200,
		});
	})
);

export default router;
