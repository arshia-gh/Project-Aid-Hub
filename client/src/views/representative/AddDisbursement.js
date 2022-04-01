import { DisbursementForm } from 'components/Forms/DisbursementForm';
import { useAppealQuery } from 'hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const {
	Card,
	CardHeader,
	Row,
	Col,
	CardBody,
	Spinner,
	Badge,
	CardTitle,
} = require('reactstrap');

const AddDisbursement = () => {
	const { appealId } = useParams();
	const navigate = useNavigate();
	const { state: applicant } = useLocation();
	const {
		isLoading,
		isSuccess,
		isError,
		data: appeal,
	} = useAppealQuery(appealId);

	if (isError || applicant == null) {
		navigate(-1, { replace: true });
	}

	const getAvailableAmount = () =>
		parseFloat(appeal.donatedCash) +
		parseFloat(appeal.donatedGoods) -
		parseFloat(appeal.disbursedAmount);

	return (
		<>
			{isSuccess && (
				<Row className='mb-4 d-flex'>
					<Col xl={3} lg={4} md={6}>
						<Card className='card-stats mb-4 mb-lg-0'>
							<CardBody>
								<Row>
									<div className='col'>
										<CardTitle className='text-uppercase text-muted mb-0'>
											Applicant ID Number
										</CardTitle>
										<span className='h2 font-weight-bold mb-0'>
											{applicant.IDno}
										</span>
									</div>
								</Row>
							</CardBody>
						</Card>
					</Col>
					<Col xl={3} lg={4} md={6}>
						<Card className='card-stats mb-4 mb-lg-0'>
							<CardBody>
								<Row>
									<div className='col'>
										<CardTitle className='text-uppercase text-muted mb-0'>
											Applicant Name
										</CardTitle>
										<span className='h2 font-weight-bold mb-0'>
											{applicant.fullname}
										</span>
									</div>
								</Row>
							</CardBody>
						</Card>
					</Col>
					<Col xl={3} lg={4} md={6}>
						<Card className='card-stats mb-4 mb-lg-0'>
							<CardBody>
								<Row>
									<div className='col'>
										<CardTitle className='text-uppercase text-muted mb-0'>
											Applicant H.I.
										</CardTitle>
										<span className='h2 font-weight-bold mb-0'>
											RM
											{applicant.householdIncome}
										</span>
									</div>
								</Row>
							</CardBody>
						</Card>
					</Col>
					<Col xl={3} lg={4} md={6}>
						<Card className='card-stats mb-4 mb-lg-0'>
							<CardBody>
								<Row>
									<div className='col'>
										<CardTitle className='text-uppercase text-muted mb-0'>
											Available Amount
										</CardTitle>
										<span className='h2 font-weight-bold mb-0'>
											RM{getAvailableAmount().toFixed(2)}
										</span>
									</div>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}

			<Card className='bg-secondary shadow'>
				<CardHeader className='bg-white border-0'>
					<Row className='align-items-center'>
						<Col>
							<h3 className='mb-0'>Record disbursement</h3>
						</Col>
					</Row>
				</CardHeader>
				<CardBody>
					{isLoading ? (
						<div className='d-flex align-items-center ml-4 mb-4'>
							<Badge color='primary'>
								<Spinner />
							</Badge>
						</div>
					) : (
						<DisbursementForm
							appeal={appeal}
							applicant={applicant}
						/>
					)}
				</CardBody>
			</Card>
		</>
	);
};

export default AddDisbursement;
