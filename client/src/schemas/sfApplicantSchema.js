import applicantSchema from './applicantSchema';
import { number } from 'yup';

export default applicantSchema.shape({
	orgId: number().required('Required'),
	email: applicantSchema.fields.email.required('Required'),
	mobileNo: applicantSchema.fields.mobileNo.required('Required'),
});
