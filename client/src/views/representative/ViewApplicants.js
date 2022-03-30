import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	Row,
	Badge,
	Spinner,
	Col,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { OrgApplicantsTable } from 'components/DataTable';
import { useOrgApplicantsQuery } from 'hooks';
import ReturnButton from 'components/UI/ReturnButton';

const ViewApplicants = () => {
	const { auth } = useAuth();

	const { Organization: organization } = auth.user;

	const {
		isLoading,
		isSuccess,
		data: applicants,
	} = useOrgApplicantsQuery(organization.id);

	return (
		<>
			<Container className='mt--7' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='border-0'>
								<Row className='align-items-center'>
									<Col className='d-flex align-items-center'>
										<ReturnButton className='mr-3' />
										<h3 className='mb-0'>
											{organization.name}'s Applicants
										</h3>
									</Col>
									<div className='col text-right'>
										<Link
											to={
												'/representative/new-applicant'
											}>
											<Button color='primary' size='sm'>
												<i class='fas fa-plus'></i>{' '}
												Register Applicant
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
								<OrgApplicantsTable applicants={applicants} />
							)}
							{isSuccess && applicants.length === 0 && (
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
