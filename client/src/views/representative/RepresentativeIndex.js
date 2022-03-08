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
	Alert,
	UncontrolledAlert,
} from 'reactstrap';

import OrgHeader from 'components/Headers/OrganizationHeader';
import { Link } from 'react-router-dom';
import { AlertContext } from 'contexts/AlertProvider';
import CustomAlert from 'components/UI/Alert';
import useAuth from 'hooks/useAuth';
import ApplicantTable from 'components/ApplicantTable/ApplicantTable';

const RepresentativeIndex = () => {
	const { auth } = useAuth();

	const [applicants, setApplicants] = useState([]);
	const [organization, setOrganization] = useState({});

	const { error: alertError } = useContext(AlertContext);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getApplicants = async () => {
			try {
				const orgResponse = await axios.get(
					`/organizations/${auth.user.orgId}`
				);
				const response = await axios.get(
					`/organizations/${auth.user.orgId}/applicants`,
					{
						signal: controller.signal,
					}
				);

				isMounted && setApplicants(response.data.result);
				isMounted && setOrganization(orgResponse.data.result);
			} catch (err) {
				if (err.response) {
					const { error, code } = err.response.data;
					alertError(`An ${code} error occurred`, error.message);
				}
			}
		};

		getApplicants();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [alertError, auth]);

	return (
		<>
			<OrgHeader organization={organization} />
			<Container className='mt--7' fluid>
				<CustomAlert />
				{auth.newApplicant && (
					<UncontrolledAlert color='primary' fade={false}>
						<span className='alert-inner--text'>
							<strong>New Applicant Info</strong>
							<br />
							Username: {auth.newApplicant.username}
							<br />
							Password: {auth.newApplicant.password}
						</span>
					</UncontrolledAlert>
				)}
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='border-0'>
								<Row className='align-items-center'>
									<div className='col'>
										<h3 className='mb-0'>
											List of Applicants
										</h3>
									</div>
									<div className='col text-right'>
										<Link
											to={
												'/representative/new-applicant'
											}>
											<Button color='primary' size='sm'>
												Add Applicant
											</Button>
										</Link>
									</div>
								</Row>
							</CardHeader>
							<ApplicantTable
								applicants={applicants}
								organization={organization}
							/>
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
