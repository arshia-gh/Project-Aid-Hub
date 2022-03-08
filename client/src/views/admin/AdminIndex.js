import { useState, useEffect, useContext } from 'react';

import axios from 'api/axios';

// reactstrap components
import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	Row,
	Badge
} from 'reactstrap';

import AdminHeader from 'components/Headers/AdminHeader';
import { Link, useLocation } from 'react-router-dom';
import OrganizationTable from 'components/OrganizationTable/OrganizationTable';
import { AlertContext } from 'contexts/AlertProvider';
import Alert from 'components/UI/Alert';

const Organizations = () => {
	const location = useLocation();
	const [organizations, setOrganizations] = useState([]);

	const { error: alertError } = useContext(AlertContext);

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
				const { error, code } = err.response.data;
				alertError(`An ${code} error occurred`, error.message);
			}
		};

		getOrganizations();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [alertError]);

	return (
		<>
			<AdminHeader />
			<Container className='mt--7' fluid>
				<Alert/>
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
										<Link to={`new-organization`}>
											<Button color='primary' size='sm'>
												Add Organization
											</Button>
										</Link>
									</div>
								</Row>
							</CardHeader>
							<OrganizationTable organizations={organizations} location={location}/>
							{organizations.length === 0 && (
								<CardFooter>
									<Badge color='info'>No organization was found</Badge>
								</CardFooter>
							)}
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Organizations;
