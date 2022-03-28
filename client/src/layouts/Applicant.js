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

const routes = [
	{
		index: 'profile',
		name: 'Profile',
		icon: 'ni ni-single-02 text-yellow',
		element: <Profile />,
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
				{routeResults || <Navigate to='profile' replace />}
				<Container fluid>
					<DashboardFooter />
				</Container>
			</div>
		</>
	);
};

export default ApplicantLayout;
