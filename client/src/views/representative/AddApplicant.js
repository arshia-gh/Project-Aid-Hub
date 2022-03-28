// reactstrap components
import { Card, Col, Container, Row, CardHeader, CardBody } from 'reactstrap';

import { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import OrgHeader from 'components/Headers/OrganizationHeader';
import ApplicantForm from 'components/Forms/ApplicantForm';
import useAuth from 'hooks/useAuth';
import axios from 'api/axios';
import { useAlerts } from 'hooks';
import { ControlledModal } from 'components/UI/ConfirmModal';

const AddApplicant = () => {
	const [organization, setOrganization] = useState({});
	const { addAlert } = useAlerts();
	const modalRef = useRef();

	const navigate = useNavigate();
	const { auth } = useAuth();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getApplicants = async () => {
			try {
				const orgResponse = await axios.get(
					`/organizations/${auth.user.orgId}`
				);

				isMounted && setOrganization(orgResponse.data.result);
			} catch (err) {
				if (err.response) {
					const { error, code } = err.response.data;
					addAlert({
						title: `An ${code} error occurred`,
						message: error.message,
						mode: 'danger',
					});
					navigate('/representative');
				}
			}
		};

		getApplicants();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [auth, addAlert, navigate]);

	const onSuccessRegister = (data) => {
		modalRef.current.setApplicant(data.result);
		modalRef.current.toggleModal();
	};

	return (
		<>
			<ControlledModal ref={modalRef} onClose={() => navigate('..')} />
			<OrgHeader organization={organization} />
			<Container className='mt--7' fluid>
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
							organization={organization}
							onSuccess={onSuccessRegister}
						/>
					</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default AddApplicant;
