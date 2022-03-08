import OrganizationForm from 'components/Forms/OrganizationForm';
import AdminHeader from 'components/Headers/AdminHeader';
import { AlertContext } from 'contexts/AlertProvider';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { Card, CardHeader, CardBody, Col, Container, Row } from 'reactstrap';

const AddOrganization = () => {
	const { success, error } = useContext(AlertContext);

	const history = useHistory();

	const onAddOrganization = (payload) => {
		if (payload.error) {
			error(
				`Error ${payload.data.code}`,
				`Error ${payload.data.message}`
			);
		} else {
			success('Success', 'Organization was successfully created');
			history.push('/admin/organizations');
		}
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
						<OrganizationForm onSubmit={onAddOrganization} />
					</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default AddOrganization;
