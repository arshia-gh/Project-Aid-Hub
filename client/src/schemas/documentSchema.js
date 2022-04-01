import { object, string } from 'yup';

export default object({
	filename: string()
		.trim()
		.min(6)
		.max(255)
		.required('Required')
		.label('Filename'),
	description: string()
		.trim()
		.max(255)
		.required('Required')
		.label('Description'),
});
