import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Row,
	Badge,
	Spinner,
	Col,
	CardBody,
	CardTitle,
	CardText,
	Label,
	Alert,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { useAppealsQuery } from 'hooks';
import { useState } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { truncText } from 'shared';

const getStatusColor = (status) => {
	return status === 'collecting'
		? 'success'
		: status === 'disbursing'
		? 'primary'
		: 'warning';
};

const filterModes = [
	{
		value: 'all',
		label: 'All Appeals',
	},
	{
		value: 'active',
		label: 'Active Appeals',
	},
	{
		value: 'inactive',
		label: 'Inactive Appeals',
	},
];

const ViewPastAppeals = () => {
	const { isLoading, isSuccess, data: appeals } = useAppealsQuery();
	const [filterMode, setFilterMode] = useState();
	const filteredAppeals =
		isSuccess &&
		appeals.filter((ap) => {
			const current = moment().startOf('day');
			return filterMode === 'active'
				? moment(ap.toDate).isAfter(current) && ap.outcome !== 'ended'
				: filterMode === 'inactive'
				? moment(ap.toDate).isSameOrBefore(current) ||
				  ap.outcome === 'ended'
				: true;
		});

	return (
		<Card className='shadow'>
			<CardHeader>
				<Row className='align-items-center'>
					<div className='col'>
						<h3 className='mb-0'>Past Appeals</h3>
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
			<CardBody>
				{isLoading ? (
					<div className='d-flex align-items-center ml-4 mb-4'>
						<Badge color='primary'>
							<Spinner />
						</Badge>
					</div>
				) : filteredAppeals.length === 0 ? (
					<Alert fade={false} color='warning d-inline-block'>
						<p className='mb-0'>
							No appeal was found based on your selection
						</p>
					</Alert>
				) : (
					<Row>
						{filteredAppeals.map((ap) => (
							<Col
								key={ap.id}
								xs={12}
								lg={6}
								xl={4}
								className='d-flex mb-4'>
								<Card className='bg-secondary flex-grow-1'>
									<CardHeader
										className={`bg-${getStatusColor(
											ap.outcome
										)}`}>
										<Badge className='bg-white text-dark px-2 py-2'>
											{ap.outcome}
										</Badge>
									</CardHeader>
									<CardBody className='d-flex flex-column align-items-start'>
										<CardTitle>
											{truncText(ap.title, 20)}
										</CardTitle>
										<CardText className='flex-grow-1'>
											{truncText(ap.description, 45)}
										</CardText>
										<Button
											tag={Link}
											to={ap.id.toString()}
											color='primary'
											size='sm'>
											View more
										</Button>
									</CardBody>
									<CardFooter>
										<div className='d-flex justify-content-between align-items-center'>
											<Badge
												color='primary'
												className='mb-0'>
												starting
											</Badge>
											<p className='mb-0'>
												{moment(ap.fromDate).format(
													'MMM D, YYYY'
												)}
											</p>
										</div>
										<div className='d-flex justify-content-between align-items-center'>
											<Badge
												color='primary'
												className='mb-0'>
												ending
											</Badge>
											<p className='mb-0'>
												{moment(ap.toDate).format(
													'MMM D, YYYY'
												)}
											</p>
										</div>
									</CardFooter>
								</Card>
							</Col>
						))}
					</Row>
				)}
			</CardBody>
		</Card>
	);
};

export default ViewPastAppeals;
