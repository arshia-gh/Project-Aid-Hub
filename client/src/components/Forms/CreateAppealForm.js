import FormFooter from 'components/Footers/FormFooter';
import Field from 'components/UI/Form/Field';
import { Formik, Form } from 'formik';
import { Col, FormGroup, Row } from 'reactstrap';
import schema from 'schemas/appealSchema';
import moment from 'moment';
import FieldDate from 'components/UI/Form/FieldDate';
import { postAppeals } from 'api/axios';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const CreateAppealForm = () => {
	const current = moment().startOf('day');
	const { auth } = useAuth();
	const navigate = useNavigate();

	const submitHandler = async (values) => {
		const castValues = schema.cast(values);
		console.log(castValues);
		const response = await postAppeals(
			castValues,
			auth.user.Organization.id
		);
		navigate('../');
	};

	return (
		<Formik
			onSubmit={submitHandler}
			validationSchema={schema}
			initialValues={{
				fromDate: current.format('YYYY-MM-DD'),
				toDate: current.clone().add(1, 'days').format('YYYY-MM-DD'),
				title: '',
				description: '',
				targetAmount: '',
			}}
			validateOnMount>
			{({ isSubmitting, resetForm, getFieldProps }) => (
				<Form>
					<FormGroup>
						<Field label='Title' name='title' />
					</FormGroup>
					<FormGroup>
						<Field label='Target amount' name='targetAmount' />
					</FormGroup>
					<FormGroup>
						<Field
							label='Description'
							name='description'
							type='textarea'
						/>
					</FormGroup>
					<Row>
						<Col lg={6}>
							<FormGroup>
								<FieldDate
									name='fromDate'
									inputProps={{
										placeholder: 'Select',
									}}
									isValidDate={(currentDate) => {
										const crtDate = moment(currentDate);
										const endDate = moment(
											getFieldProps('toDate').value
										);
										return (
											crtDate.isSameOrAfter(current) &&
											!crtDate.isSame(endDate)
										);
									}}
									timeFormat={false}
									renderDay={(props, currentDate) => {
										const startDate = moment(
											getFieldProps('fromDate').value
										);
										const endDate = moment(
											getFieldProps('toDate').value
										);
										const crtDate = moment(currentDate._d);

										let classes = props.className;
										if (crtDate.isSame(startDate)) {
											classes += ' start-date';
										} else if (
											crtDate.isAfter(startDate) &&
											crtDate.isBefore(endDate)
										) {
											classes += ' middle-date';
										} else if (crtDate.isSame(endDate)) {
											classes += ' end-date';
										}
										return (
											<td {...props} className={classes}>
												{currentDate.date()}
											</td>
										);
									}}
								/>
							</FormGroup>
						</Col>
						<Col lg={6}>
							<FormGroup>
								<FieldDate
									name='toDate'
									inputProps={{
										placeholder: 'Select',
									}}
									isValidDate={(currentDate) => {
										return moment(currentDate).isAfter(
											getFieldProps('fromDate').value
										);
									}}
									timeFormat={false}
									renderDay={(props, currentDate) => {
										const startDate = moment(
											getFieldProps('fromDate').value
										);
										const endDate = moment(
											getFieldProps('toDate').value
										);
										const crtDate = moment(currentDate._d);

										let classes = props.className;
										if (crtDate.isSame(startDate)) {
											classes += ' start-date';
										} else if (
											crtDate.isAfter(startDate) &&
											crtDate.isBefore(endDate)
										) {
											classes += ' middle-date';
										} else if (crtDate.isSame(endDate)) {
											classes += ' end-date';
										}
										return (
											<td {...props} className={classes}>
												{currentDate.date()}
											</td>
										);
									}}
								/>
							</FormGroup>
						</Col>
					</Row>

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
