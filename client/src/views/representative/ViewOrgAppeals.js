import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Row,
	Badge,
	Spinner,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { OrgAppealsTable } from 'components/Data';
import { useOrgAppealsQuery } from 'hooks';

const ViewOrgAppeals = () => {
	const { auth } = useAuth();
	const { Organization: organization } = auth.user;

	const {
		isLoading,
		isSuccess,
		data: appeals,
	} = useOrgAppealsQuery(organization.id);

	return (
		<Card className='shadow'>
			<CardHeader className='border-0'>
				<Row className='align-items-center'>
					<div className='col'>
						<h3 className='mb-0'>{organization.name}'s Appeals</h3>
					</div>
					<div className='col text-right'>
						<Button
							tag={Link}
							to='new-appeal'
							color='primary'
							size='sm'>
							<i class='fas fa-plus'></i> Create Appeals
						</Button>
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
				<OrgAppealsTable appeals={appeals} />
			)}

			{isSuccess && appeals.length === 0 && (
				<CardFooter>
					<Badge color='info'>No appeals was found</Badge>
				</CardFooter>
			)}
		</Card>
	);
};

export default ViewOrgAppeals;
