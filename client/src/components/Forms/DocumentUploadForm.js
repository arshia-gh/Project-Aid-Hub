import FormFooter from 'components/Footers/FormFooter';
import Field from 'components/UI/Form/Field';
import { Formik, Form } from 'formik';
import { Col, FormGroup, Row } from 'reactstrap';
import schema from 'schemas/documentSchema';
import { postDocument } from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from 'hooks';
import Dropzone from 'react-dropzone';
import { useState } from 'react';

export const DocumentUploadForm = ({ applicant }) => {
	const navigate = useNavigate();
	const { addAlert } = useAlerts();
	const [document, setDocument] = useState();

	const handleOnDrop = (files, setFieldValue) => {
		if (files && files.length > 0) {
			const file = files[0];
			setDocument(file);
			setFieldValue('filename', file.name);
		}
	};

	const submitHandler = async (values) => {
		console.log(document);
		const castValues = schema.cast(values);
		const formData = new FormData();
		formData.append('document', document);
		formData.append('filename', castValues.filename);
		formData.append('description', castValues.description);

		await postDocument(formData, applicant.IDno);
		addAlert({
			title: 'Success',
			message: 'Applicant document was successfully recorded',
			mode: 'success',
		});
		navigate('./..');
	};

	return (
		<Formik
			onSubmit={submitHandler}
			validationSchema={schema}
			initialValues={{
				filename: '',
				description: '',
			}}
			validateOnMount>
			{({ isSubmitting, resetForm, setFieldValue }) => (
				<Form>
					<FormGroup>
						<Dropzone
							onDrop={(files) =>
								handleOnDrop(files, setFieldValue)
							}
							multiple={false}
							accept='application/pdf'>
							{({ getRootProps, getInputProps }) => (
								<div
									{...getRootProps({
										className:
											'border border-light rounded bg-white d-block d-flex align-item-center shadow',
										style: {
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											padding: '20px',
											cursor: 'pointer',
											height: '120px',
											outline: 'none',
										},
									})}>
									<input {...getInputProps()} />
									<p className='text-center'>
										Drag 'n' drop some files here, or click
										to select files
									</p>
								</div>
							)}
						</Dropzone>
					</FormGroup>
					<Row>
						<FormGroup tag={Col} lg={6}>
							<Field label='Filename' name='filename' disabled />
						</FormGroup>
						<FormGroup tag={Col} lg={6}>
							<Field
								label='Description'
								name='description'
								type='textarea'
							/>
						</FormGroup>
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
