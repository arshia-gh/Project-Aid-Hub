import { CashDonationForm } from 'components/Forms/CashDonationForm';
import { GoodsForm } from 'components/Forms/GoodsForm';
import { useAppealQuery } from 'hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const {
	Card,
	CardHeader,
	CardBody,
	Badge,
	Spinner,
	ButtonGroup,
	Button,
} = require('reactstrap');

const AddContribution = () => {
	const { appealId } = useParams();
	const [type, setType] = useState('CASH_DONATION');
	const navigate = useNavigate();
	const { isLoading, isError, data: appeal } = useAppealQuery(appealId);

	if (isError || (appeal && appeal.outcome === 'ended')) {
		navigate(-1, { replace: true });
	}

	return (
		<Card className='bg-secondary shadow'>
			<CardHeader className='bg-white d-flex align-items-center'>
				<h3 className='mb-0 mr-auto'>Record Contribution</h3>
				<p className='mb-0 mr-4'>Recording</p>
				<ButtonGroup>
					<Button
						color='primary'
						outline={type === 'GOODS'}
						onClick={() => setType('CASH_DONATION')}>
						Cash Donation
					</Button>
					<Button
						color='primary'
						outline={type === 'CASH_DONATION'}
						onClick={() => setType('GOODS')}>
						Goods
					</Button>
				</ButtonGroup>
			</CardHeader>
			<CardBody>
				{isLoading ? (
					<div className='d-flex align-items-center ml-4 mb-4'>
						<Badge color='primary'>
							<Spinner />
						</Badge>
					</div>
				) : type === 'GOODS' ? (
					<GoodsForm appeal={appeal} />
				) : (
					<CashDonationForm appeal={appeal} />
				)}
			</CardBody>
		</Card>
	);
};

export default AddContribution;
