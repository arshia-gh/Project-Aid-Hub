import React from 'react';
import {
	useLocation,
	useRoutes,
	matchRoutes,
	Navigate,
} from 'react-router-dom';

// reactstrap components
import { Container } from 'reactstrap';

// core components
import DashboardNavbar from 'components/Navbars/DashboardNavbar.js';
import DashboardFooter from 'components/Footers/DashboardFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import Profile from 'views/applicant/Profile';
import DashboardHeader from 'components/Headers/DashboardHeader';
import AddDocument from 'views/applicant/AddDocument';
import ViewDisbursements from 'views/applicant/ViewDisbursements';

const routes = [
	{
		index: true,
		name: 'Dashboard',
		icon: 'fas fa-book-open text-primary',
		element: <ViewDisbursements />,
	},
	{
		path: 'profile',
		name: 'My Profile',
		icon: 'ni ni-single-02 text-primary',
		element: <Profile />,
	},
	{
		path: 'new-document',
		name: 'Add Document',
		icon: 'fas fa-file text-primary',
		element: <AddDocument />,
	},
];

const ApplicantLayout = () => {
	const routeResults = useRoutes(routes);
	const location = useLocation();
	const [match] = matchRoutes(routes, location.pathname, '/applicant') ?? [];

	return (
		<>
			<Sidebar routes={routes} indexLink='/applicant' />
			<div className='main-content'>
				<DashboardNavbar brandText={match?.route.name || 'Dashboard'} />
				<DashboardHeader />

				<Container className='mt--7' fluid>
					{routeResults || <Navigate to='profile' replace />}
				</Container>

				<Container fluid>
					<DashboardFooter />
				</Container>
			</div>
		</>
	);
};

export default ApplicantLayout;
