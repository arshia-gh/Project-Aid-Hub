import React from 'react';
import schema from 'schemas/applicantSchema';

import { Formik, Form } from 'formik';
import axios, { parseError } from 'api/axios';

import { Form as FormBS, FormGroup } from 'reactstrap';
import Field from 'components/UI/Form/Field';
import { useAlerts } from 'hooks';
import FormFooter from 'components/Footers/FormFooter';

const ApplicantForm = ({ organization, onSuccess }) => {
	const { addAlert } = useAlerts();

	const submitHandler = async (values, { setErrors }) => {
		const castValues = schema.cast(values);
		try {
			const response = await axios.post(
				`/organizations/${organization.id}/applicants`,
				{
					fullname: castValues.fullname,
					IDno: castValues.IDno,
					householdIncome: values.householdIncome,
					address: values.address,
				}
			);

			onSuccess(response.data);
		} catch (err) {
			if (err.response?.data.error && err.response?.data.code) {
				const { message, fields } = parseError(err.response.data);
				setErrors(fields);
				addAlert({
					title: 'Registration failed',
					message,
					mode: 'danger',
				});
			}
		}
	};

	return (
		<Formik
			onSubmit={submitHandler}
			initialValues={{
				fullname: '',
				householdIncome: '',
				IDno: '',
				address: '',
			}}
			validateOnMount
			validationSchema={schema}>
			{({ isSubmitting, resetForm }) => (
				<FormBS tag={Form}>
					<p className='heading-small text-muted mb-4 h6'>
						Personal Information
					</p>
					<FormGroup>
						<Field label='Full name' name='fullname' type='text' />
					</FormGroup>
					<FormGroup>
						<Field label='ID number' name='IDno' type='text' />
					</FormGroup>
					<FormGroup>
						<Field
							label='Household Income'
							name='householdIncome'
							type='text'
							prepend='RM'
							formNoValidate
						/>
					</FormGroup>
					<FormGroup>
						<Field label='Address' name='address' type='textarea' />
					</FormGroup>

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

export default ApplicantForm;
