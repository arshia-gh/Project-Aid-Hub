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
	UncontrolledAlert,
} from 'reactstrap';

import OrgHeader from 'components/Headers/OrganizationHeader';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import Table from 'components/UI/Table';
import { useAlerts } from 'hooks';

const ViewApplicants = () => {
	const { auth } = useAuth();
	const { addAlert } = useAlerts();

	const [applicants, setApplicants] = useState([]);
	const [organization, setOrganization] = useState({});

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
					addAlert({
						title: `An ${code} error occurred`,
						message: error.message,
						mode: 'danger',
					});
				}
			}
		};

		getApplicants();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [auth, addAlert]);

	return (
		<>
			<OrgHeader organization={organization} />
			<Container className='mt--7' fluid>
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
							<Table
								data={applicants}
								headers={{
									username: 'Username',
									fullname: 'Full Name',
									IDno: 'ID Number',
									householdIncome: 'Household Income',
									address: 'Address',
								}}
								rowKey='username'
								hoverable
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

export default ViewApplicants;
