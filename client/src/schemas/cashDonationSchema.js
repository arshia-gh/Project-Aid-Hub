import { object, string, number } from 'yup';

export default object({
	amount: number()
		.typeError('Amount must be a valid number')
		.positive()
		.required('Required')
		.label('Amount'),
	paymentChannel: string()
		.trim()
		.max(255)
		.required('Required')
		.label('Payment channel'),
	referenceNo: string()
		.trim()
		.max(255)
		.required('Required')
		.label('Reference number'),
});
