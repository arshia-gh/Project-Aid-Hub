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
	Badge,
} from 'reactstrap';

import AdminHeader from 'components/Headers/AdminHeader';
import { Link } from 'react-router-dom';
import { AlertContext } from 'contexts/AlertProvider';
import Alert from 'components/UI/Alert';
import useAuth from 'hooks/useAuth';
import ApplicantTable from 'components/ApplicantTable/ApplicantTable';

const RepresentativeIndex = () => {
	const { auth } = useAuth();

	const [applicants, setApplicants] = useState([]);

	const { error: alertError } = useContext(AlertContext);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getOrganizations = async () => {
			try {
				const response = await axios.get(
					`/organizations/${auth.user.orgId}/applicants`,
					{
						signal: controller.signal,
					}
				);

				isMounted && setApplicants(response.data.result);
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
	}, [alertError, auth]);

	return (
		<>
			<AdminHeader />
			<Container className='mt--7' fluid>
				<Alert />
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
							<ApplicantTable applicants={applicants} />
							{applicants.length === 0 && (
								<CardFooter>
									<Badge color='info'>
										No applicant was found
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

export default RepresentativeIndex;
