import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	Row,
	Badge,
	Spinner,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { OrgAppealsTable } from 'components/DataTable';
import { useOrgAppealsQuery } from 'hooks';

const ViewAppeals = () => {
	const { auth } = useAuth();
	const { Organization: organization } = auth.user;

	const {
		isLoading,
		isSuccess,
		data: appeals,
	} = useOrgAppealsQuery(organization.id);

	return (
		<>
			<Container className='mt--7' fluid>
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
							{isLoading ? (
								<div className='d-flex align-items-center ml-4 mb-4'>
									<Badge color='primary'>
										<Spinner />
									</Badge>
								</div>
							) : (
								<OrgAppealsTable appeals={appeals} />
							)}
							<CardFooter>
								{isSuccess && appeals.length === 0 && (
									<Badge color='info'>
										No applicant was found
									</Badge>
								)}
							</CardFooter>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default ViewAppeals;
