import {
	Card,
	CardHeader,
	Row,
	Badge,
	Spinner,
	CardBody,
	Alert,
	CardFooter,
} from 'reactstrap';

import { useNavigate, useParams } from 'react-router-dom';
import { useAvailableApplicantsQuery } from 'hooks';
import { AvailableApplicantTable } from 'components/Data/AvailableApplicantTable';
import ReturnButton from 'components/UI/ReturnButton';

const ViewAvailableApplicants = () => {
	const { appealId } = useParams();
	const navigate = useNavigate();
	const {
		isLoading,
		isSuccess,
		isError,
		data: applicants,
	} = useAvailableApplicantsQuery(appealId);

	if (isError) {
		navigate(-1, { replace: true });
	}

	return (
		<Card className='shadow'>
			<CardHeader className='border-0'>
				<Row className='align-items-center'>
					<div className='col'>
						<h3 className='mb-0'>Available Applicants</h3>
					</div>
					<div>
						{isSuccess && applicants.length !== 0 && (
							<Badge color='primary'>
								Please select an applicant from the list below
							</Badge>
						)}
					</div>
				</Row>
			</CardHeader>
			{isLoading ? (
				<div className='d-flex align-items-center ml-4 mb-4'>
					<Badge color='primary'>
						<Spinner />
					</Badge>
				</div>
			) : applicants.length === 0 ? (
				<CardBody>
					<Alert fade={false} color='warning d-inline-block'>
						<h3>No available applicants was found</h3>
						<p className='mb-0'>This might have happened due to </p>
						<p className='mb-0'>
							- No applicants are registered with your
							organization
						</p>
						<p className='mb-0'>
							- All applicants registered with your organization
							has been already assigned a disbursement through
							this appeal.
						</p>
					</Alert>
				</CardBody>
			) : (
				<AvailableApplicantTable applicants={applicants} />
			)}
			<CardFooter>
				<ReturnButton />
			</CardFooter>
		</Card>
	);
};

export default ViewAvailableApplicants;
