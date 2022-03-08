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
import RepresentativeTable from 'components/RepresentativeTable/RepresentativeTable';

const ViewOrganization = (props) => {
	const params = useParams();
	const [representatives, setRepresentatives] = useState([]);
	const [organization, setOrganization] = useState({});

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
				console.error(err);
			}
		};

		getRepresentatives();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [params.id]);

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
										<Link
											to={`/admin/organization/${organization.id}/new-representative`}>
											<Button
												color='primary'
												onClick={(e) =>
													e.preventDefault()
												}
												size='sm'>
												Add Representative
											</Button>
										</Link>
									</div>
								</Row>
							</CardHeader>
							<RepresentativeTable
								representatives={representatives}
							/>
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
