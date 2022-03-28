/* eslint-disable no-template-curly-in-string */
import { string } from 'yup';
import userSchema from './userSchema';

export default userSchema.shape({
	username: string()
		.trim()
		.min(6, 'Username must be at least ${min} characters')
		.max(12, 'Username must be at most ${max} characters')
		.required('Required'),
	jobTitle: string()
		.trim()
		.max(255, 'Job title must be at most ${max} characters')
		.required('Required'),
	email: userSchema.fields.email.required('Required'),
	mobileNo: userSchema.fields.mobileNo.required('Required'),
});
