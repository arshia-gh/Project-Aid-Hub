import { useState, useEffect } from 'react';

import axios from 'api/axios';

// reactstrap components
import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	Row,
	Badge,
} from 'reactstrap';

import AdminHeader from 'components/Headers/AdminHeader';
import { Link } from 'react-router-dom';
import Table from 'components/UI/Table';
import { useAlerts } from 'hooks';

const ViewAllOrganizations = () => {
	const [organizations, setOrganizations] = useState([]);
	const { addAlert } = useAlerts();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getOrganizations = async () => {
			try {
				const response = await axios.get('/organizations', {
					signal: controller.signal,
				});

				isMounted && setOrganizations(response.data.result);
			} catch (err) {
				if (err.response) {
					const { error, code } = err.response.data;
					addAlert({
						title: `An ${code} error occurred`,
						message: error.message,
						mode: 'danger',
					});
				}
			}
		};

		getOrganizations();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [addAlert]);

	return (
		<>
			<AdminHeader />
			<Container className='mt--7' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='border-0'>
								<Row className='align-items-center'>
									<div className='col'>
										<h3 className='mb-0'>
											List of Organizations
										</h3>
									</div>
									<div className='col text-right'>
										<Button
											tag={Link}
											to='new-organization'
											color='primary'
											size='sm'>
											Add Organization
										</Button>
									</div>
								</Row>
							</CardHeader>
							<Table
								data={organizations}
								headers={{
									id: 'ID',
									name: 'Name',
									address: 'Address',
								}}
								links={[
									{
										url: (org) => `organizations/${org.id}`,
										content: 'View Representatives',
									},
									{
										url: (org) =>
											`organizations/${org.id}/new-representative`,
										content: 'Add Representative',
									},
								]}
								rowKey='id'
								hoverable
							/>
							{organizations.length === 0 && (
								<CardFooter>
									<Badge color='info'>
										No organization was found
									</Badge>
								</CardFooter>
							)}
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default ViewAllOrganizations;
