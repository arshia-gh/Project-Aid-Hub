import React from 'react';
import schema from 'schemas/sfApplicantSchema';

import { Formik, Form } from 'formik';
import axios, { parseError } from 'api/axios';

import { Form as FormBS, FormGroup, Label, Input } from 'reactstrap';
import ReturnButton from 'components/UI/ReturnButton';
import FieldSelect from 'components/UI/Form/FieldSelect';
import Field from 'components/UI/Form/Field';
import SubmitButton from 'components/UI/Form/SubmitButton';
import { useAlerts } from 'hooks';

const SFApplicantForm = ({ organizations = [], onSuccess }) => {
	const { addAlert } = useAlerts();

	const submitHandler = async (values, { setErrors }) => {
		const castValues = schema.cast(values);
		try {
			const response = await axios.post(
				`/organizations/${castValues.orgId}/applicants`,
				{
					fullname: castValues.fullname,
					email: castValues.email,
					mobileNo: castValues.mobileNo,
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
				orgId: '',
				fullname: '',
				mobileNo: '',
				email: '',
				householdIncome: '',
				IDno: '',
				address: '',
			}}
			validateOnMount
			validationSchema={schema}>
			{({ isSubmitting, values }) => (
				<FormBS tag={Form}>
					<p className='heading-small text-muted mb-4 h6'>
						Organization Information
					</p>
					<FormGroup>
						<FieldSelect
							label='Organization Name'
							options={organizations}
							getOptionLabel={(opt) => opt.name}
							getOptionValue={(opt) => opt.id}
							noOptionsMessage={({ inputValue }) =>
								inputValue === ''
									? 'No organization was found'
									: `Organization with the name '${inputValue}' does not exist`
							}
							placeholder='Select an organization'
							name='orgId'
						/>
					</FormGroup>
					<FormGroup>
						<Label>Organization Address</Label>
						<Input
							disabled
							type='textarea'
							value={
								organizations.find(
									(org) => org.id === values.orgId
								)?.address ??
								'Organization address will be shown here'
							}
						/>
					</FormGroup>
					<p className='heading-small text-muted mb-4 h6'>
						Personal Information
					</p>
					<FormGroup>
						<Field label='Full name' name='fullname' type='text' />
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

					<div className='text-center mt-4 d-flex'>
						<ReturnButton size='md' />
						<SubmitButton
							className='flex-grow-1'
							color='primary'
							type='submit'
							isSubmitting={isSubmitting}>
							Register
						</SubmitButton>
					</div>
				</FormBS>
			)}
		</Formik>
	);
};

export default SFApplicantForm;
