import React from 'react';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'api/axios';

// reactstrap components
import {
	Button,
	FormGroup,
	Form,
	FormText,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from 'reactstrap';
import { useContext } from 'react';
import { AlertContext } from 'contexts/AlertProvider';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
	username: yup.string().required('username is required'),
	password: yup.string().required('password is required'),
});

const UserLoginForm = ({ onSuccessAuth }) => {
	const { error: alertError } = useContext(AlertContext);

	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		defaultValues: { username: '', password: '' },
		resolver: yupResolver(schema),
	});

	const submitHandler = async (data) => {
		try {
			const response = await axios.post('/login', {
				username: data.username,
				password: data.password,
			});

			onSuccessAuth(response.data);
		} catch (err) {
			const { error } = err.response.data;
			alertError('Authentication failed', error.message);
			reset();
		}
	};

	return (
		<Form onSubmit={handleSubmit(submitHandler)}>
			<p className='small text-muted'>
				Please use your login credentials to login
			</p>
			<FormGroup className='mb-3'>
				<InputGroup className='input-group-alternative'>
					<InputGroupAddon addonType='prepend'>
						<InputGroupText>
							<i className='ni ni-circle-08' />
						</InputGroupText>
					</InputGroupAddon>
					<Controller
						name='username'
						control={control}
						render={({ field }) => (
							<Input
								placeholder='Username'
								type='text'
								autoComplete='off'
								{...field}
							/>
						)}
					/>
				</InputGroup>
				<FormText className='text-red'>
					{errors.username?.message}
				</FormText>
			</FormGroup>
			<FormGroup>
				<InputGroup className='input-group-alternative'>
					<InputGroupAddon addonType='prepend'>
						<InputGroupText>
							<i className='ni ni-lock-circle-open' />
						</InputGroupText>
					</InputGroupAddon>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<Input
								placeholder='Password'
								type='password'
								autoComplete='off'
								{...field}
							/>
						)}
					/>
				</InputGroup>
				<FormText className='text-red'>
					{errors.password?.message}
				</FormText>
			</FormGroup>
			<Row className='my-2 justify-content-center align-items-center'>
				<Col xs={4} className='pr-1'>
					<Button color='primary' type='submit' className='w-100'>
						Sign in
					</Button>
				</Col>

				<Col className='pl-1'>
					<Link to='/auth/register'>
						<Button color='success' type='button' className='w-100'>
							Register as applicant
						</Button>
					</Link>
				</Col>
			</Row>
		</Form>
	);
};

export default UserLoginForm;
