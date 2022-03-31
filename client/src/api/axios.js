import axios from 'axios';

export const instance = axios.create({
	baseURL: 'http://localhost:8080/api',
});

export const getOrgApplicants = async (orgId) => {
	return instance.get(`/organizations/${orgId}/applicants`);
};

export const getOrgAppeals = async (orgId) => {
	return instance.get(`/organizations/${orgId}/appeals`);
};

export const postAppeals = async (appeal, orgId) => {
	return instance.post(`/organizations/${orgId}/appeals`, appeal);
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
