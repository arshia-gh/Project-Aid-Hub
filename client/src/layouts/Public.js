import React from 'react';
import {
	Navigate,
	useLocation,
	matchRoutes,
	useRoutes,
} from 'react-router-dom';

// reactstrap components
import { Container, Row } from 'reactstrap';

// core components
import DashboardNavbar from 'components/Navbars/DashboardNavbar.js';
import DashboardFooter from 'components/Footers/DashboardFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import ViewAppeals from 'views/public/ViewAppeals';
import DashboardHeader from 'components/Headers/DashboardHeader';
import ViewAppeal from 'views/public/ViewAppeal';
import AddCashDonation from 'views/public/AddCashDonation';

const routes = [
	{
		path: '/',
		name: 'Home',
		icon: 'fas fa-home text-primary',
		element: <Navigate to='/' />,
	},
	{
		path: 'appeals',
		name: 'View Appeals',
		icon: 'fas fa-book-open text-primary',
		element: <ViewAppeals />,
	},
	{
		path: 'appeals/:appealId',
		name: 'View Appeal Details',
		invisible: true,
		element: <ViewAppeal />,
	},
	{
		path: 'appeals/:appealId/contribute',
		name: 'Record Cash Donation',
		invisible: true,
		element: <AddCashDonation />,
	},
];

const PublicLayout = () => {
	const routeResults = useRoutes(routes);
	const location = useLocation();
	const [match] = matchRoutes(routes, location.pathname, '/public') ?? [];

	return (
		<>
			<Sidebar routes={routes} indexLink='/public' />
			<div className='main-content'>
				<DashboardNavbar brandText={match?.route.name || 'Appeals'} />
				<DashboardHeader />
				<Container className='mt--7' fluid>
					<Row>
						<div className='col'>
							{routeResults || <Navigate to='appeals' replace />}
						</div>
					</Row>
				</Container>
				<Container fluid>
					<DashboardFooter />
				</Container>
			</div>
		</>
	);
};

export default PublicLayout;
