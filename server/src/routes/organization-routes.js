import express from 'express';
import { promisify, validator } from '../middleware/utils-middleware.js';

import {
	createOrganization,
	getOrganizationById,
	getOrganizations,
} from '../controllers/organization-controller.js';

import OrganizationSchema from '../schemas/organization-schema.js';

import representativeRouter from './representative-routes.js';
import applicantRouter from './applicant-routes.js';

const router = express.Router();

router.get(
	'/',
	promisify(async (req, res) => {
		const organizations = await getOrganizations();

		res.status(200).json({
			result: organizations,
			code: 200,
		});
	})
);

router.get(
	'/:orgId',
	promisify(async (req, res) => {
		const { orgId } = req.params;
		const foundOrganization = await getOrganizationById(orgId);

		res.status(200).json({
			result: foundOrganization,
			code: 200,
		});
	})
);

router.post(
	'/',
	validator.body(OrganizationSchema),
	promisify(async (req, res) => {
		const newOrganization = await createOrganization(req.body);

		res.status(200).json({
			result: newOrganization,
			code: 200,
		});
	})
);

router.use('/:orgId/representatives', representativeRouter);
router.use('/:orgId/applicants', applicantRouter);

export default router;
