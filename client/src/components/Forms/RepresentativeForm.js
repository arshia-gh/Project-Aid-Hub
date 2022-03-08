import React, { useState, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'api/axios';
import FormFooter from 'components/UI/FormFooter';

import { Button, FormText, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import useAlert from 'hooks/useAlert';

const schema = yup.object().shape({
	fullname: yup
		.string()
		.matches(/^[a-zA-Z ]+$/, 'Fullname contains invalid characters')
		.min(3)
		.max(50)
		.required('Fullname is required'),
	username: yup.string().min(6).max(12).required('Username is required'),
	jobTitle: yup.string().max(255).required('Job title is required'),
	email: yup.string().email().max(255).required('Email address is required'),
	mobileNo: yup
		.string()
		.matches(/^[0-9()+-]+$/, 'invalid mobile number')
		.min(10)
		.max(12)
		.required('Mobile number is required'),
});

const RepresentativeForm = ({ organization, onSuccessRegister }) => {
	const { error: alertError } = useAlert();

	const {
		handleSubmit,
		formState: { errors },
		control,
		setError,
		reset,
	} = useForm({
		defaultValues: {
			fullname: '',
			username: '',
			email: '',
			mobileNo: '',
			jobTitle: '',
		},
		resolver: yupResolver(schema),
	});

	const submitHandler = async (data) => {
		try {
			const response = await axios.post(
				`/organizations/${organization.id}/representatives`,
				{
					...data,
				}
			);

			onSuccessRegister(response.data);
		} catch (err) {
			const { error, code } = err.response.data;
			if (code === 400 && error.fields) {
				for (const key in error.fields) {
					setError(key, {
						message:
							error.fields[key] +
							(error.name === 'UniqueConstraintError'
								? 'is not unique'
								: ''),
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
					type='text'
					required
					id='input-organization-name'
					value={organization.name}
					readOnly></Input>
			</FormGroup>
			<FormGroup>
				<label htmlFor='input-organization-address'>
					Organization Address
				</label>
				<Input
					type='textarea'
					row={4}
					id='input-organization-address'
					value={organization.address}
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
							htmlFor='input-username'>
							Username
						</label>
						<Controller
							name='username'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									placeholder='ID Number'
									id='input-username'
									type='text'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.username?.message}
						</FormText>
					</FormGroup>
				</Col>
				<Col sm='12'>
					<FormGroup>
						<label
							className='form-control-label'
							htmlFor='input-jobTitle'>
							Job title
						</label>
						<Controller
							name='jobTitle'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									placeholder='Job title'
									id='input-jobTitle'
									type='text'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.jobTitle?.message}
						</FormText>
					</FormGroup>
				</Col>
				<Col sm='12'>
					<FormGroup>
						<label
							className='form-control-label'
							htmlFor='input-emailAddress'>
							Email Address
						</label>
						<Controller
							name='email'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									placeholder='Email Address'
									id='input-emailAddress'
									type='email'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.email?.message}
						</FormText>
					</FormGroup>
				</Col>
				<Col sm='12'>
					<FormGroup>
						<label
							className='form-control-label'
							htmlFor='input-mobileNo'>
							Mobile Number
						</label>
						<Controller
							name='mobileNo'
							control={control}
							render={({ field }) => (
								<Input
									className='form-control-alternative'
									placeholder='Mobile Number'
									id='input-mobileNo'
									row={4}
									type='text'
									{...field}
								/>
							)}
						/>
						<FormText className='text-red'>
							{errors.mobileNo?.message}
						</FormText>
					</FormGroup>
				</Col>
			</Row>
			<hr className='my-4' />
			<FormFooter onReset={reset} />
		</Form>
	);
};

export default RepresentativeForm;
