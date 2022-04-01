import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Row,
	Badge,
	Spinner,
	Alert,
	CardBody,
} from 'reactstrap';

import { Link, useNavigate } from 'react-router-dom';
import { useAppealDisbursementsQuery, useAppealQuery } from 'hooks';
import { useParams } from 'react-router-dom';
import ReturnButton from 'components/UI/ReturnButton';
import { AppealDisbursementsTable } from 'components/Data/AppealDisbursementsTable';

const ViewAppealDisbursements = () => {
	const { appealId } = useParams();
	const navigate = useNavigate();
	const {
		isLoading,
		isError,
		data: disbursements,
	} = useAppealDisbursementsQuery(appealId);
	const { isSuccess: isAppealSuccess, data: appeal } =
		useAppealQuery(appealId);

	if (isError) {
		navigate(-1, { replace: true });
	}

	const getAvailableAmount = () =>
		parseFloat(appeal.donatedCash) +
		parseFloat(appeal.donatedGoods) -
		parseFloat(appeal.disbursedAmount);

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
				<AppealDisbursementsTable disbursements={disbursements} />
			)}
			<CardFooter className='d-flex align-items-center'>
				<ReturnButton className='mr-auto' />
				{isAppealSuccess && appeal.outcome === 'ended' ? (
					<Badge color='warning'>
						Disbursement cannot be recorded as appeal has ended
					</Badge>
				) : isAppealSuccess && getAvailableAmount() <= 0 ? (
					<Badge color='warning'>
						Disbursement cannot be recorded as available amount is
						insufficient
					</Badge>
				) : (
					isAppealSuccess && (
						<Button
							tag={Link}
							to='./../available'
							color='default'
							size='sm'>
							<i className='fas fa-plus'></i> Record Disbursement
						</Button>
					)
				)}
			</CardFooter>
		</Card>
	);
};

export default ViewAppealDisbursements;
