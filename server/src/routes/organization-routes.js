import express from 'express';
import { promisify, validator } from '../middleware/utils-middleware.js';

import {
	createOrganization,
	getOrganizationById,
	getOrganizations,
} from '../controllers/organization-controller.js';

import {
	getApplicants,
	createApplicant,
	createOrgRepresentative,
	getOrgRepresentatives,
} from '../controllers/user-controller.js';

import ApplicantSchema from '../schemas/applicant-schema.js';
import OrgRepresentative from '../schemas/representative-schema.js';
import OrganizationSchema from '../schemas/organization-schema.js';

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

router.get(
	'/:orgId/applicants',
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
	'/:orgId/applicants',
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

router.get(
	'/:orgId/representatives',
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
	'/:orgId/representatives',
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
