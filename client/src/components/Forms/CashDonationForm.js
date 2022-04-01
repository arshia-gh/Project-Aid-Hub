import FormFooter from 'components/Footers/FormFooter';
import Field from 'components/UI/Form/Field';
import { Formik, Form } from 'formik';
import { Col, FormGroup, Row } from 'reactstrap';
import schema from 'schemas/cashDonationSchema';
import { postCashDonation } from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from 'hooks';

export const CashDonationForm = ({ appeal }) => {
	const navigate = useNavigate();
	const { addAlert } = useAlerts();

	const submitHandler = async (values) => {
		const castValues = schema.cast(values);
		await postCashDonation(castValues, appeal.id);
		addAlert({
			title: 'Success',
			message: 'Cash donation was successfully recorded',
			mode: 'success',
		});

		navigate('./..');
	};

	return (
		<Formik
			onSubmit={submitHandler}
			validationSchema={schema}
			initialValues={{
				amount: '',
				paymentChannel: '',
				referenceNo: '',
			}}
			validateOnMount>
			{({ isSubmitting, resetForm }) => (
				<Form>
					<Row>
						<FormGroup tag={Col} lg={6}>
							<Field prepend='RM' label='Amount' name='amount' />
						</FormGroup>
						<FormGroup tag={Col} lg={6}>
							<Field
								label='Payment channel'
								name='paymentChannel'
							/>
						</FormGroup>
					</Row>
					<FormGroup>
						<Field label='Reference number' name='referenceNo' />
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
