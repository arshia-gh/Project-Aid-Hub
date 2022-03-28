import OrganizationForm from 'components/Forms/OrganizationForm';
import AdminHeader from 'components/Headers/AdminHeader';
import { useAlerts } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Col, Container, Row } from 'reactstrap';

const AddOrganization = () => {
	const navigate = useNavigate();
	const { addAlert } = useAlerts();

	const onAddOrganization = () => {
		addAlert({
			title: 'Success',
			message: 'Organization was successfully added',
			mode: 'success',
		});
		navigate('..', { replace: true });
	};
	return (
		<>
			<AdminHeader />
			<Container className='mt--7' fluid>
				<Card className='bg-secondary shadow'>
					<CardHeader className='bg-white border-0'>
						<Row className='align-items-center'>
							<Col xs='8'>
								<h3 className='mb-0'>Add New Organization</h3>
							</Col>
						</Row>
					</CardHeader>
					<CardBody>
						<OrganizationForm onSuccess={onAddOrganization} />
					</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default AddOrganization;
