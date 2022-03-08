import { useForm, Controller } from 'react-hook-form';
import { FormGroup, Form, Input, Row, Col, FormText } from 'reactstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'api/axios';
import FormFooter from 'components/UI/FormFooter';

const schema = yup.object().shape({
	name: yup.string().max(255).required('name is required'),
	address: yup.string().max(255).required('address is required'),
});

const OrganizationForm = ({ onSubmit }) => {
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		defaultValues: { name: '', address: '' },
		resolver: yupResolver(schema),
	});

	const onSubmitHandler = async (data) => {
		const payload = await axios.post('/organizations', {
			name: data.name,
			address: data.address,
		});

		onSubmit(payload);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)}>
			<h6 className='heading-small text-muted mb-4'>
				Organization Information
			</h6>
			<div className='pl-lg-4'>
				<Row>
					<Col sm='12'>
						<FormGroup>
							<label
								className='form-control-label'
								htmlFor='input-name'>
								Organization Name
							</label>
							<Controller
								name='name'
								control={control}
								render={({ field }) => (
									<Input
										className='form-control-alternative'
										id='input-name'
										placeholder='Organization name'
										name='name'
										type='text'
										{...field}
									/>
								)}
							/>
							<FormText className='text-red'>
								{errors.name?.message}
							</FormText>
						</FormGroup>
					</Col>
					<Col sm='12'>
						<FormGroup>
							<label
								className='form-control-label'
								htmlFor='input-address'>
								Organization Address
							</label>
							<Controller
								name='address'
								control={control}
								render={({ field }) => (
									<Input
										className='form-control-alternative'
										placeholder='555 Parisian Walk, 88240, West Rodrigo, Florida, Qatar'
										rows='4'
										id='input-address'
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
			</div>
			<hr className='my-4' />
			<FormFooter onReset={reset} />
		</Form>
	);
};

export default OrganizationForm;
