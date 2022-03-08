import React from 'react';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'api/axios';

// reactstrap components
import {
	Button,
	FormGroup,
	FormText,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
} from 'reactstrap';
import { useContext } from 'react';
import { AlertContext } from 'contexts/AlertProvider';

const schema = yup.object().shape({
	token: yup.string().required('token is required'),
});

const AdminLoginForm = ({ onSuccessAuth }) => {
	const { error: alertError } = useContext(AlertContext);

	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		defaultValues: { token: '' },
		resolver: yupResolver(schema),
	});

	const submitHandler = async (data) => {
		try {
			const response = await axios.post('/admin-login', {
				token: data.token,
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
				Please use your admin token to login
			</p>
			<FormGroup>
				<InputGroup className='input-group-alternative'>
					<InputGroupAddon addonType='prepend'>
						<InputGroupText>
							<i className='ni ni-lock-circle-open' />
						</InputGroupText>
					</InputGroupAddon>
					<Controller
						name='token'
						control={control}
						render={({ field }) => (
							<Input
								placeholder='Token'
								type='password'
								autoComplete='off'
								{...field}
							/>
						)}
					/>
				</InputGroup>
				<FormText className='text-red'>
					{errors.token?.message}
				</FormText>
			</FormGroup>
			<Button color='primary' type='submit' className='w-100'>
				Sign in
			</Button>
		</Form>
	);
};

export default AdminLoginForm;
