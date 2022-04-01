import { object, string, number } from 'yup';

export default object({
	estimatedValue: number()
		.typeError('Estimated value must be a valid number')
		.positive()
		.required('Required')
		.label('Estimated value'),
	description: string()
		.trim()
		.max(255)
		.required('Required')
		.label('Description'),
});
