import React, { useState, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'api/axios';

import { Button, FormText, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import useAlert from 'hooks/useAlert';

const schema = yup.object().shape({
	fullname: yup
		.string()
		.matches(/^[a-zA-Z ]+$/, 'Fullname contains invalid characters')
		.min(3)
		.max(50)
		.required('Fullname is required'),
	IDno: yup
		.string()
		.matches(/^[0-9]+$/, 'ID number format is invalid')
		.length(12)
		.required('ID number is required'),
	householdIncome: yup
		.number()
		.positive()
		.required('Household income is required'),
	address: yup.string().max(255).required('Address is required'),
});

const ApplicantForm = ({ organizations = [], onSuccessRegister }) => {
	const [selectedOrganization, setSelectedOrganization] = useState();

	const onSelectOrganization = (e) => {
		const selectedIdx = organizations.findIndex(
			({ id }) => id === parseInt(e.target.value)
		);
		setSelectedOrganization(organizations[selectedIdx]);
	};

	useEffect(() => {
		setSelectedOrganization(organizations[0]);
	}, [organizations]);

	const { error: alertError } = useAlert();

	const {
		handleSubmit,
		formState: { errors },
		control,
		setError,
	} = useForm({
		defaultValues: {
			fullname: '',
			IDno: '',
			householdIncome: 0,
			address: '',
		},
		resolver: yupResolver(schema),
	});

	const submitHandler = async (data) => {
		try {
			const response = await axios.post(
				`/organizations/${selectedOrganization.id}/applicants`,
				{
					fullname: data.fullname,
					IDno: data.IDno,
					householdIncome: data.householdIncome,
					address: data.address,
				}
			);

			onSuccessRegister(response.data);
		} catch (err) {
			const { error, code } = err.response.data;
			if (code === 400 && error.fields) {
				for (const key in error.fields) {
					setError(key, {
						message: error.fields[key] + ' is not unique',
					});
				}
			}

			alertError('Registration failed', error.message);
		}
	};

	return (
		<Form onSubmit={handleSubmit(submitHandler)}>
			<p className='heading-small text-muted mb-4 h6'>
				Organization Information
			</p>
			<FormGroup>
				<label htmlFor='input-organization-name'>
					Organization Name
				</label>
				<Input
					type='select'
					required
					id='input-organization-name'
					onChange={(e) => onSelectOrganization(e)}
					disabled={organizations.length === 1}>
					{organizations.map((org) => (
						<option value={org.id} key={org.id}>
							{org.name}
						</option>
					))}
				</Input>
			</FormGroup>
			<FormGroup>
				<label htmlFor='input-organization-address'>
					Organization Address
				</label>
				<Input
					type='textarea'
					row={4}
					id='input-organization-address'
					value={selectedOrganization?.address || ''}
					disabled></Input>
			</FormGroup>

			<p className='heading-small text-muted mb-4 h6'>
				Personal Information
			</p>
			<Row>
				<Col sm='12'>
					<FormGroup>
						<label
							className='form-control-label'
							htmlFor='input-fullname'>
							Fullname
						</label>
						<Controller
							name='fullname'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									id='input-fullname'
									placeholder='Fullname'
									type='text'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.fullname?.message}
						</FormText>
					</FormGroup>
				</Col>
				<Col sm='12'>
					<FormGroup>
						<label
							className='form-control-label'
							htmlFor='input-IDno'>
							ID Number
						</label>
						<Controller
							name='IDno'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									placeholder='ID Number'
									id='input-IDno'
									type='text'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.IDno?.message}
						</FormText>
					</FormGroup>
				</Col>
				<Col sm='12'>
					<FormGroup>
						<label
							className='form-control-label'
							htmlFor='input-householdIncome'>
							Household Income
						</label>
						<Controller
							name='householdIncome'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									placeholder='Household Income'
									id='input-householdIncome'
									type='number'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.householdIncome?.message}
						</FormText>
					</FormGroup>
				</Col>
				<Col sm='12'>
					<FormGroup>
						<label
							className='form-control-label'
							htmlFor='input-address'>
							Address
						</label>
						<Controller
							name='address'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									placeholder='Address'
									id='input-address'
									row={4}
									type='textarea'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.address?.message}
						</FormText>
					</FormGroup>
				</Col>
			</Row>
			<div className='text-center'>
				<Button className='mt-4' color='primary' type='submit'>
					Register
				</Button>
			</div>
		</Form>
	);
};

export default ApplicantForm;
