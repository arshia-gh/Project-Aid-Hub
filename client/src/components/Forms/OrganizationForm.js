import { FormGroup, Form as FormBS } from 'reactstrap';
import { Formik, Form } from 'formik';
import schema from 'schemas/organisationSchema';
import axios, { parseError } from 'api/axios';
import FormFooter from 'components/Footers/FormFooter';
import Field from 'components/UI/Form/Field';
import { useAlerts } from 'hooks';

const OrganizationForm = ({ onSuccess }) => {
	const { addAlert } = useAlerts();
	const submitHandler = async (values, { setErrors }) => {
		const castValues = schema.cast(values);
		try {
			const response = await axios.post('/organizations', {
				name: castValues.name,
				address: castValues.address,
			});

			onSuccess(response.data);
		} catch (err) {
			if (err.response?.data.error && err.response?.data.code) {
				const { message, fields } = parseError(err.response.data);
				setErrors(fields);
				addAlert({
					title: 'Submission failed',
					message,
					mode: 'danger',
				});
			}
		}
	};

	return (
		<Formik
			initialValues={{ name: '', address: '' }}
			onSubmit={submitHandler}
			validateOnMount
			validationSchema={schema}>
			{({ isSubmitting, resetForm }) => (
				<FormBS tag={Form}>
					<h6 className='heading-small text-muted mb-4'>
						Organization Information
					</h6>
					<div className='pl-lg-4'>
						<FormGroup>
							<Field
								label='Organization Name'
								name='name'
								type='text'
							/>
						</FormGroup>
						<FormGroup>
							<Field
								label='Organization Address'
								name='address'
								type='textarea'
								rows={4}
							/>
						</FormGroup>
					</div>
					<hr className='my-4' />
					<FormFooter
						isSubmitting={isSubmitting}
						onReset={resetForm}
					/>
				</FormBS>
			)}
		</Formik>
	);
};

export default OrganizationForm;
