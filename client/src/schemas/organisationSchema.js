/* eslint-disable no-template-curly-in-string */
import { string, object } from 'yup';

export default object().shape({
	name: string()
		.trim()
		.max(255, 'Organization name must be at most ${max} characters')
		.required('Required'),
	address: string()
		.trim()
		.max(255, 'Organization address must be at most ${max} characters')
		.required('Required'),
});
