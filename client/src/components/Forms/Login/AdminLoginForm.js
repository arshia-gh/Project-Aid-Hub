import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// reactstrap components
import { Form as FormBS, FormGroup } from 'reactstrap';
import Field from 'components/UI/Form/Field';
import SubmitButton from 'components/UI/Form/SubmitButton';

const schema = Yup.object().shape({
	token: Yup.string().required('Required'),
});

const AdminLoginForm = ({ authHandler }) => {
	const submitHandler = async (values, { resetForm, setSubmitting }) => {
		const error = await authHandler(values);
		if (error) {
			resetForm();
		}
	};

	return (
		<Formik
			initialValues={{ token: '' }}
			validationSchema={schema}
			validateOnMount
			onSubmit={submitHandler}>
			{({ isSubmitting }) => (
				<FormBS tag={Form}>
					<p className='small text-muted'>
						Please use your admin token to login
					</p>
					<FormGroup>
						<Field
							prepend={<i className='ni ni-lock-circle-open' />}
							name='token'
							placeholder='Token'
							type='password'
							autoComplete='off'
						/>
					</FormGroup>
					<SubmitButton
						isSubmitting={isSubmitting}
						color='primary'
						type='submit'
						onLoadText='Loading...'
						className='w-100'>
						Login
					</SubmitButton>
				</FormBS>
			)}
		</Formik>
	);
};

export default AdminLoginForm;
