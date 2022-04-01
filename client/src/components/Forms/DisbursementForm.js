import FormFooter from 'components/Footers/FormFooter';
import Field from 'components/UI/Form/Field';
import { Formik, Form } from 'formik';
import { FormGroup } from 'reactstrap';
import { postDisbursements } from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from 'hooks';
import { object, number, date, string } from 'yup';
import FieldDate from 'components/UI/Form/FieldDate';
import moment from 'moment';

export const DisbursementForm = ({ appeal, applicant }) => {
	const current = moment().startOf('day');
	const fromDate = moment(appeal.fromDate).add('dayS', 1);
	const navigate = useNavigate();
	const { addAlert } = useAlerts();

	const availableAmount =
		parseFloat(appeal.donatedCash) +
		parseFloat(appeal.donatedGoods) -
		parseFloat(appeal.disbursedAmount);

	const schema = object({
		disbursementDate: date()
			.min(
				appeal.fromDate,
				"Disbursement date must be greater or equal to appeal's from date"
			)
			.required('Required')
			.label('Disbursement date'),
		amount: number()
			.positive()
			.typeError('Amount amount must be a valid number')
			.max(
				availableAmount,
				// eslint-disable-next-line no-template-curly-in-string
				'Amount should be less than or equal to the available amount (RM${max})'
			)
			.label('Amount'),
		description: string()
			.trim()
			.max(255)
			.required('Required')
			.label('Description'),
	});

	const submitHandler = async (values) => {
		const castValues = schema.cast(values);
		await postDisbursements(castValues, appeal.id, applicant.IDno);
		addAlert({
			title: 'Success',
			message: 'Disbursement was successfully recorded',
			mode: 'success',
		});
		navigate(`/representative/appeals/${appeal.id}/disbursements`);
	};

	return (
		<Formik
			onSubmit={submitHandler}
			validationSchema={schema}
			initialValues={{
				disbursementDate: fromDate.format('YYYY-MM-DD'),
				amount: '',
				description: '',
			}}
			validateOnMount>
			{({ isSubmitting, resetForm }) => (
				<Form>
					<FormGroup>
						<FieldDate
							label='Disbursement date'
							name='disbursementDate'
							inputProps={{
								placeholder: 'Select',
							}}
							isValidDate={(currentDate) => {
								const crtDate = moment(currentDate);
								return (
									crtDate.isSameOrAfter(current) &&
									crtDate.isSameOrAfter(fromDate)
								);
							}}
							timeFormat={false}
						/>
					</FormGroup>
					<FormGroup>
						<Field
							prepend='RM'
							label='Disbursement Amount'
							name='amount'
						/>
					</FormGroup>
					<FormGroup>
						<Field
							label='Description'
							name='description'
							type='textarea'
						/>
					</FormGroup>

					<hr className='my-4' />
					<FormFooter
						isSubmitting={isSubmitting}
						onReset={resetForm}
					/>
				</Form>
			)}
		</Formik>
	);
};
