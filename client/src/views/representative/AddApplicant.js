// reactstrap components
import { Card, Col, Row, CardHeader, CardBody } from 'reactstrap';

import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import ApplicantForm from 'components/Forms/ApplicantForm';
import useAuth from 'hooks/useAuth';
import { ControlledModal } from 'components/UI/ConfirmModal';

const AddApplicant = () => {
	const modalRef = useRef();
	const navigate = useNavigate();

	const { auth } = useAuth();

	const onSuccessRegister = (data) => {
		modalRef.current.setApplicant(data.result);
		modalRef.current.toggleModal();
	};

	return (
		<>
			<ControlledModal
				ref={modalRef}
				onClose={() => navigate('../applicants')}
			/>
			<Card className='bg-secondary shadow'>
				<CardHeader className='bg-white border-0'>
					<Row className='align-items-center'>
						<Col xs='8'>
							<h3 className='mb-0'>Add New Applicant</h3>
						</Col>
					</Row>
				</CardHeader>
				<CardBody>
					<ApplicantForm
						organization={auth.user.Organization}
						onSuccess={onSuccessRegister}
					/>
				</CardBody>
			</Card>
		</>
	);
};

export default AddApplicant;
