import { useState, useEffect } from 'react';

import axios from 'api/axios';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	Container,
	Row,
	Badge,
	CardFooter,
} from 'reactstrap';

import OrgHeader from 'components/Headers/OrganizationHeader';
import { useParams, Link } from 'react-router-dom';
import ReturnButton from 'components/UI/ReturnButton';
import Table from 'components/UI/Table';
import { useAlerts } from 'hooks';

const ViewOrganization = (props) => {
	const [representatives, setRepresentatives] = useState([]);
	const [organization, setOrganization] = useState({});
	const { addAlert } = useAlerts();

	const params = useParams();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getRepresentatives = async () => {
			try {
				const response = await axios.get(
					`/organizations/${params.id}/representatives`,
					{
						signal: controller.signal,
					}
				);
				const orgResponse = await axios.get(
					`/organizations/${params.id}`,
					{
						signal: controller.signal,
					}
				);

				isMounted && setOrganization(orgResponse.data.result);
				isMounted && setRepresentatives(response.data.result);
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

		getRepresentatives();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [params, addAlert]);

	return (
		<>
			<OrgHeader organization={organization} />
			<Container className='mt--7' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='border-0'>
								<Row className='align-items-center'>
									<div className='col'>
										<h3 className='mb-0'>
											List of Representatives
										</h3>
										{representatives.length === 0 && (
											<Badge color='info'>
												No representative was found
											</Badge>
										)}
									</div>
									<div className='col text-right'>
										<Button
											tag={Link}
											to='new-representative'
											color='primary'
											size='sm'>
											Add Representative
										</Button>
									</div>
								</Row>
							</CardHeader>
							{representatives.length !== 0 && (
								<Table
									data={representatives}
									headers={{
										username: 'Username',
										fullname: 'Full Name',
										jobTitle: 'Job Title',
										email: 'Email Address',
										mobileNo: 'HP Number',
									}}
									rowKey='username'
								/>
							)}
							<hr className='m-0' />
							<CardFooter className='border-0 bg-secondary'>
								<ReturnButton />
							</CardFooter>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default ViewOrganization;
