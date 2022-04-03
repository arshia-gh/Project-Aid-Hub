import axios from 'axios';

const apiUrl = process.env.API_URL || 'http://localhost:8080/api';

export const instance = axios.create({
	baseURL: apiUrl,
});

export const getOrganizations = async () => {
	return instance.get(`organizations/`);
};

export const getOrganization = async (orgId) => {
	return instance.get(`organizations/${orgId}`);
};

export const getRepresentatives = async (orgId) => {
	return instance.get(`organizations/${orgId}/representatives`);
};

export const getOrgApplicants = async (orgId) => {
	return instance.get(`/organizations/${orgId}/applicants`);
};

export const getOrgAppeals = async (orgId) => {
	return instance.get(`/organizations/${orgId}/appeals`);
};

export const getAppeals = async () => {
	return instance.get(`/appeals`);
};

export const postAppeals = async (appeal, orgId) => {
	return instance.post(`/organizations/${orgId}/appeals`, appeal);
};

export const postCashDonation = async (cashDonation, appealId) => {
	return instance.post(`/appeals/${appealId}/cash-donations`, cashDonation);
};

export const postGoods = async (goods, appealId) => {
	return instance.post(`/appeals/${appealId}/goods`, goods);
};

export const postDisbursements = async (disbursement, appealId, IDno) => {
	return instance.post(`/appeals/${appealId}/disbursements`, {
		...disbursement,
		IDno,
	});
};

export const getApplicantDocuments = async (IDno) => {
	return instance.get(`/applicants/${IDno}/documents`);
};

export const postDocument = async (document, IDno) => {
	return instance.post(`/applicants/${IDno}/documents`, document, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

export const getAppealById = async (appealId) => {
	return instance.get(`/appeals/${appealId}`);
};

export const getContributions = async (appealId) => {
	return instance.get(`/appeals/${appealId}/contributions`);
};

export const getApplicant = async (IDno) => {
	return instance.get(`/applicants/${IDno}`);
};

export const getAvailableApplicants = async (appealId) => {
	return instance.get(`/appeals/${appealId}/available`);
};

export const getAppealDisbursements = async (appealId) => {
	return instance.get(`/appeals/${appealId}/disbursements`);
};

export const getApplicantDisbursements = async (IDno) => {
	return instance.get(`/applicants/${IDno}/disbursements`);
};

export const parseError = (error) => {
	const {
		error: { message, name, fields },
		code,
	} = error;
	const parsedError = { message, name, code };

	if (fields) {
		parsedError.fields = parseFieldErrors(fields, name);
	}

	return parsedError;
};

export const parseFieldErrors = (fields, errorName) => {
	const fieldErrors = {};
	for (const field in fields) {
		let errMessage;
		if (errorName === 'UniqueConstraintError') {
			errMessage = `${field} must be unique`;
		} else if (errorName === 'ValidationError') {
			errMessage = fields[field];
		} else {
			errMessage = `${field} was rejected`;
		}
		fieldErrors[field] = errMessage;
	}
	return fieldErrors;
};

export default instance;
