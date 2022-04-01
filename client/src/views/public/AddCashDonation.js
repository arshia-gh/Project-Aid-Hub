import { CashDonationForm } from 'components/Forms/CashDonationForm';
import { useAppealQuery } from 'hooks';
import { useNavigate, useParams } from 'react-router-dom';

const { Card, CardHeader, CardBody, Badge, Spinner } = require('reactstrap');

const AddCashDonation = () => {
	const { appealId } = useParams();
	const navigate = useNavigate();
	const { isLoading, isError, data: appeal } = useAppealQuery(appealId);

	if (isError || (appeal && appeal.outcome === 'ended')) {
		navigate(-1, { replace: true });
	}

	return (
		<Card className='bg-secondary shadow'>
			<CardHeader className='bg-white d-flex align-items-center'>
				<h3 className='mb-0 mr-auto'>Record Cash Donation</h3>
			</CardHeader>
			<CardBody>
				{isLoading ? (
					<div className='d-flex align-items-center ml-4 mb-4'>
						<Badge color='primary'>
							<Spinner />
						</Badge>
					</div>
				) : (
					<CashDonationForm appeal={appeal} />
				)}
			</CardBody>
		</Card>
	);
};

export default AddCashDonation;
