import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Row,
	Badge,
	Spinner,
	Col,
	Label,
	Alert,
	CardBody,
} from 'reactstrap';

import { Link, useNavigate } from 'react-router-dom';
import { useAppealQuery, useContributionsQuery } from 'hooks';
import { useParams } from 'react-router-dom';
import { CashDonationsTable } from 'components/Data/CashDonationsTable';
import Select from 'react-select';
import { useState } from 'react';
import ReturnButton from 'components/UI/ReturnButton';
import { GoodsTable } from 'components/Data/GoodsTable';

const filterModes = [
	{
		value: 'CASH_DONATION',
		label: 'Cash Donations',
	},
	{
		value: 'GOODS',
		label: 'Goods Contributions',
	},
];

const ViewContributions = () => {
	const { appealId } = useParams();
	const navigate = useNavigate();
	const {
		isLoading,
		isSuccess,
		isError,
		data: contributions,
	} = useContributionsQuery(appealId);
	const { isSuccess: isAppealSuccess, data: appeal } =
		useAppealQuery(appealId);

	const [filterMode, setFilterMode] = useState(filterModes[0].value);
	const filteredContributions =
		isSuccess &&
		contributions.filter((c) => c.contributionType === filterMode);

	if (isError) {
		navigate(-1, { replace: true });
	}

	return (
		<Card className='shadow'>
			<CardHeader>
				<Row className='align-items-center'>
					<div className='col'>
						<h3 className='mb-0'>Contributions</h3>
					</div>
					<Col
						xs={6}
						lg={4}
						xl={3}
						className='d-flex justify-content-between align-items-center'>
						<Label className='mr-4 mb-0'>Show</Label>
						<Select
							className='flex-grow-1'
							isClearable={false}
							defaultValue={filterModes[0]}
							onChange={(option) => setFilterMode(option.value)}
							options={filterModes}></Select>
					</Col>
				</Row>
			</CardHeader>
			{isLoading ? (
				<div className='d-flex align-items-center ml-4 mb-4'>
					<Badge color='primary'>
						<Spinner />
					</Badge>
				</div>
			) : filteredContributions.length === 0 ? (
				<CardBody>
					<Alert fade={false} color='warning d-inline-block'>
						<p className='mb-0'>
							No contribution was found based on your selection
						</p>
					</Alert>
				</CardBody>
			) : filterMode === 'GOODS' ? (
				<GoodsTable goods={filteredContributions} />
			) : (
				<CashDonationsTable cashDonations={filteredContributions} />
			)}
			<CardFooter className='d-flex'>
				<ReturnButton className='mr-auto' />
				{isAppealSuccess && appeal.outcome !== 'ended' && (
					<Button tag={Link} to='new' color='primary' size='sm'>
						<i class='fas fa-plus'></i> Record Contribution
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default ViewContributions;
