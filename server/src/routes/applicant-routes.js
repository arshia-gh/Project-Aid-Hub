import express from 'express';
import { getApplicantDisbursements } from '../controllers/disbursement-controller.js';
import { findApplicantByIDno } from '../controllers/user-controller.js';
import { promisify, validator } from '../middleware/utils-middleware.js';
import documentSchema from '../schemas/document-schema.js';
import ApiError from '../utils/errors.js';
import path from 'path';
import fse from 'fs-extra';
import {
	getApplicantDocuments,
	recordDocument,
} from '../controllers/document-controller.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

router.post(
	'/:IDno/documents',
	validator.fields(documentSchema),
	promisify(async (req, res) => {
		if (req.files == null) {
			throw ApiError.badRequest('No file was uploaded');
		}

		const { IDno } = req.params;
		const documentFile = req.files.document;
		const basePath = path.join(__dirname, '../../', 'public', IDno);
		await fse.ensureDir(basePath);

		documentFile.mv(path.join(basePath, documentFile.name), (err) => {
			if (err) {
				throw err;
			}
			recordDocument(req.body, IDno).then((document) => {
				res.status(200).json({
					result: {
						...document,
						url: `localhost:8080/api/${IDno}/${documentFile.name}`,
					},
					code: 200,
				});
			});
		});
	})
);

router.get(
	'/:IDno/documents',
	promisify(async (req, res) => {
		const { IDno } = req.params;
		const documents = await getApplicantDocuments(IDno);

		res.status(200).json({
			result: documents.map((doc) => ({
				...doc.toJSON(),
				url: `http://localhost:8080/api/${doc.User.IDno}/${doc.filename}`,
			})),
			code: 200,
		});
	})
);

router.get(
	'/:IDno',
	promisify(async (req, res) => {
		const { IDno } = req.params;
		const applicant = await findApplicantByIDno(IDno);

		res.status(200).json({
			result: applicant,
			code: 200,
		});
	})
);

export default router;
