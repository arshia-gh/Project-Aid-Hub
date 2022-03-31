/* eslint-disable no-template-curly-in-string */
import moment from 'moment';
import { object, string, date, number, ref } from 'yup';

export default object({
	fromDate: date()
		.min(
			moment().startOf('day').toDate(),
			'Starting date must be greater or equal to current date'
		)
		.max(ref('toDate'), 'Starting date must be less than ending date')
		.required('Required'),
	toDate: date().required('Required'),
	title: string().trim().min(6).max(255).required('Required').label('Title'),
	description: string()
		.trim()
		.min(6)
		.max(255)
		.required('Required')
		.label('Description'),
	targetAmount: number()
		.typeError('Target amount must be a valid number')
		.positive()
		.required('Required')
		.label('Target amount'),
});
