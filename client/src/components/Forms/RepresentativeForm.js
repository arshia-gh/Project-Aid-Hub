import React from 'react';
import axios, { parseError } from 'api/axios';
import FormFooter from 'components/Footers/FormFooter';
import { FormGroup, Form as FormBS } from 'reactstrap';
import { Formik, Form } from 'formik';
import schema from 'schemas/representativeSchema';
import Field from 'components/UI/Form/Field';
import { useAlerts } from 'hooks';

const RepresentativeForm = ({ organization, onSuccess }) => {
	const { addAlert } = useAlerts();
	const submitHandler = async (values, { setErrors }) => {
		const castValues = schema.cast(values);
		try {
			const response = await axios.post(
				`/organizations/${organization.id}/representatives`,
				{
					fullname: castValues.fullname,
					username: castValues.username,
					jobTitle: castValues.jobTitle,
					mobileNo: castValues.mobileNo,
					email: castValues.email,
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
				username: '',
				email: '',
				mobileNo: '',
				jobTitle: '',
			}}
			validateOnMount
			validationSchema={schema}>
			{({ isSubmitting, resetForm }) => (
				<FormBS tag={Form}>
					<p className='heading-small text-muted mb-4 h6'>
						Personal Information
					</p>
					<FormGroup>
						<Field label='Full name' name='fullname' />
					</FormGroup>
					<FormGroup>
						<Field prepend='OP' label='Username' name='username' />
					</FormGroup>
					<FormGroup>
						<Field label='Job title' name='jobTitle' />
					</FormGroup>
					<FormGroup>
						<Field label='Email address' name='email' />
					</FormGroup>
					<FormGroup>
						<Field
							prepend='+60'
							label='Mobile number'
							name='mobileNo'
						/>
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

export default RepresentativeForm;
