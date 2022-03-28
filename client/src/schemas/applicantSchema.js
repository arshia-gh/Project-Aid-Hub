/* eslint-disable no-template-curly-in-string */
import { string, number } from 'yup';
import userSchema from './userSchema';

export default userSchema.shape({
	IDno: string()
		.trim()
		.uppercase()
		.matches(
			/^[A-Z0-9]+$/,
			'ID number must consist of letters and digits only'
		)
		.length(12, 'ID number must be ${length} characters')
		.required('Required'),
	householdIncome: number()
		.typeError('Household income must be a valid number')
		.min(0, 'Household income must be positive')
		.required('Required'),
	address: string()
		.max(255, 'Address must be at most ${max} characters')
		.required('Required'),
});
