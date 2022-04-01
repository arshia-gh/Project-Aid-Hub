import User from '../models/User.js';
import { findApplicantByIDno } from './user-controller.js';

export async function recordDocument(document, IDno) {
	const applicant = await findApplicantByIDno(IDno);
	return applicant.createDocument(document);
}

export async function getApplicantDocuments(IDno) {
	const applicant = await findApplicantByIDno(IDno);
	return applicant.getDocuments({ include: [User] });
}
