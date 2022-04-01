import {
	Card,
	CardHeader,
	Row,
	Badge,
	Spinner,
	Alert,
	CardBody,
} from 'reactstrap';

import useAuth from 'hooks/useAuth';
import { ApplicantDisbursementsTable } from 'components/Data/ApplicantDisbursementsTable';
import { useApplicantDisbursements } from 'hooks';

const ViewDisbursements = () => {
	const { auth } = useAuth();
	const { isLoading, data: disbursements } = useApplicantDisbursements(
		auth.user.IDno
	);

	return (
		<Card className='shadow'>
			<CardHeader>
				<Row className='align-items-center'>
					<div className='col'>
						<h3 className='mb-0'>Disbursements</h3>
					</div>
				</Row>
			</CardHeader>
			{isLoading ? (
				<div className='d-flex align-items-center ml-4 mb-4'>
					<Badge color='primary'>
						<Spinner />
					</Badge>
				</div>
			) : disbursements.length === 0 ? (
				<CardBody>
					<Alert fade={false} color='warning d-inline-block'>
						<p className='mb-0'>No disbursement was found</p>
					</Alert>
				</CardBody>
			) : (
				<ApplicantDisbursementsTable disbursements={disbursements} />
			)}
		</Card>
	);
};

export default ViewDisbursements;
