import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

// reactstrap components
import { Button, Form as FormBS, Row, Col, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import Field from 'components/UI/Form/Field';
import SubmitButton from 'components/UI/Form/SubmitButton';

const schema = yup.object().shape({
	username: yup.string().required('Required'),
	password: yup.string().required('Required'),
});

const UserLoginForm = ({ authHandler }) => {
	const submitHandler = async (data, { resetForm }) => {
		const error = authHandler(data);
		if (error) {
			resetForm();
		}
	};

	return (
		<Formik
			initialValues={{ username: '', password: '' }}
			onSubmit={submitHandler}
			validateOnMount
			validationSchema={schema}>
			{({ isSubmitting }) => (
				<FormBS tag={Form}>
					<p className='small text-muted'>
						Please use your login credentials to login
					</p>
					<FormGroup>
						<Field
							prepend={<i className='ni ni-circle-08' />}
							name='username'
							placeholder='Username'
							type='text'
							autoComplete='off'
						/>
					</FormGroup>
					<FormGroup>
						<Field
							prepend={<i className='ni ni-lock-circle-open' />}
							name='password'
							placeholder='Password'
							type='password'
							autoComplete='off'
						/>
					</FormGroup>
					<Row className='justify-content-center align-items-center'>
						<Col xs={4} className='pr-1'>
							<SubmitButton
								isSubmitting={isSubmitting}
								color='primary'
								type='submit'
								className='w-100'>
								Sign in
							</SubmitButton>
						</Col>

						<Col className='pl-1'>
							<Button
								tag={Link}
								color='success'
								to='/register'
								type='button'
								className='w-100'>
								Register as applicant
							</Button>
						</Col>
					</Row>
				</FormBS>
			)}
		</Formik>
	);
};

export default UserLoginForm;
