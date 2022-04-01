import FormFooter from 'components/Footers/FormFooter';
import Field from 'components/UI/Form/Field';
import { Formik, Form } from 'formik';
import { FormGroup } from 'reactstrap';
import schema from 'schemas/goodsSchema';
import { postGoods } from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from 'hooks';

export const GoodsForm = ({ appeal }) => {
	const navigate = useNavigate();
	const { addAlert } = useAlerts();

	const submitHandler = async (values) => {
		const castValues = schema.cast(values);
		await postGoods(castValues, appeal.id);
		addAlert({
			title: 'Success',
			message: 'Goods donation was successfully recorded',
			mode: 'success',
		});
		navigate(`/representative/appeals/${appeal.id}/contributions`);
	};

	return (
		<Formik
			onSubmit={submitHandler}
			validationSchema={schema}
			initialValues={{
				estimatedValue: '',
				description: '',
			}}
			validateOnMount>
			{({ isSubmitting, resetForm }) => (
				<Form>
					<FormGroup>
						<Field
							prepend='RM'
							label='Estimated value'
							name='estimatedValue'
						/>
					</FormGroup>
					<FormGroup>
						<Field
							label='Description'
							name='description'
							type='textarea'
						/>
					</FormGroup>

					<hr className='my-4' />
					<FormFooter
						isSubmitting={isSubmitting}
						onReset={resetForm}
					/>
				</Form>
			)}
		</Formik>
	);
};
