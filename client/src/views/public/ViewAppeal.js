import ReturnButton from 'components/UI/ReturnButton';
import { useAppealQuery } from 'hooks';
import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardText,
	CardTitle,
	Col,
	Progress,
	Row,
	Spinner,
} from 'reactstrap';

const getStatusColor = (status) => {
	return status === 'collecting'
		? 'success'
		: status === 'disbursing'
		? 'primary'
		: 'warning';
};

const ViewAppeal = () => {
	const navigate = useNavigate();
	const { appealId } = useParams();
	const {
		isLoading,
		isSuccess,
		isError,
		data: appeal,
	} = useAppealQuery(appealId);

	if (isError) {
		// TODO: 404 Page
		navigate(-1);
	}

	const getDonations = () => {
		return parseFloat(appeal.donatedCash) + parseFloat(appeal.donatedGoods);
	};

	const getTargetAmount = () => parseFloat(appeal.targetAmount);

	const getProgress = () => {
		return ((getDonations() / getTargetAmount()) * 100).toFixed(0);
	};

	return (
		<Card className='shadow'>
			<CardHeader>
				<h3 className='mb-0'>Appeal Details</h3>

				{!isLoading && (
					<div className='d-flex mt-2 align-items-start'>
						<div className='d-flex mr-2 flex-wrap'>
							<Badge color='dark' className='p-2 rounded-0'>
								Status
							</Badge>
							<Badge
								color={getStatusColor(appeal.outcome)}
								className='p-2 rounded-0'>
								{appeal.outcome}
							</Badge>
						</div>
						<div className='d-flex mr-2 flex-wrap'>
							<Badge color='dark' className='p-2 rounded-0'>
								Target Amount
							</Badge>
							<Badge color='info' className='p-2 rounded-0'>
								RM{getTargetAmount()}
							</Badge>
						</div>
						<div className='d-flex flex-wrap'>
							<Badge color='dark' className='p-2 rounded-0'>
								Received Donations
							</Badge>
							<Badge color='success' className='p-2 rounded-0'>
								RM{getDonations()}
							</Badge>
						</div>
					</div>
				)}
			</CardHeader>
			<CardBody>
				{isLoading ? (
					<div className='d-flex align-items-center ml-4 mb-4'>
						<Badge color='primary'>
							<Spinner />
						</Badge>
					</div>
				) : (
					<>
						<Row className='d-flex mb-lg-5'>
							<Col lg={8} className='mb-lg-0 mb-5 border-right'>
								<CardTitle>{appeal.title}</CardTitle>
								<CardText>{appeal.description}</CardText>
							</Col>

							<Col lg={4}>
								<p className='font-weight-bold mb-0'>
									Organization Name
								</p>
								<p>{appeal.Organization.name}</p>
								<p className='font-weight-bold mb-0'>Address</p>
								<p>{appeal.Organization.address}</p>
							</Col>
						</Row>
						<Row className='d-flex align-items-end'>
							<Col lg={8}>
								<div className='progress-wrapper'>
									<div className='progress-info'>
										<div className='progress-label'>
											<span>Appeal Progress</span>
										</div>
										<div className='progress-percentage'>
											<span>{getProgress()}%</span>
										</div>
									</div>
									<Progress max='100' value={getProgress()} />
								</div>
							</Col>
							<Col lg={4}>
								<p className='font-weight-bold mb-0'>
									Starting Date
								</p>
								<p>
									{moment(appeal.fromDate).format(
										'MMM D, YYYY'
									)}
								</p>
								<p className='font-weight-bold mb-0'>
									Ending Date
								</p>
								<p>
									{moment(appeal.toDate).format(
										'MMM D, YYYY'
									)}
								</p>
							</Col>
						</Row>
					</>
				)}
			</CardBody>
			<CardFooter className='d-flex'>
				<ReturnButton className='mr-auto' />
				{isSuccess && appeal.outcome !== 'ended' && (
					<Button
						tag={Link}
						to='contribute'
						color='default'
						size='sm'>
						<i className='fas fa-plus'></i> Record Contribution
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default ViewAppeal;
