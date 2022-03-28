import React from 'react';
import {
	Navigate,
	useLocation,
	matchRoutes,
	useRoutes,
} from 'react-router-dom';

// reactstrap components
import { Container } from 'reactstrap';

// core components
import DashboardNavbar from 'components/Navbars/DashboardNavbar.js';
import DashboardFooter from 'components/Footers/DashboardFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import AddApplicant from 'views/representative/AddApplicant';
import ViewApplicants from 'views/representative/ViewApplicants';

const routes = [
	{
		index: true,
		name: 'Dashboard',
		icon: 'fas fa-book text-blue',
		element: <ViewApplicants />,
	},
	{
		path: 'new-applicant',
		name: 'Add Applicant',
		icon: 'fas fa-plus-square text-warning',
		element: <AddApplicant />,
	},
];

const RepresentativeLayout = () => {
	const routeResults = useRoutes(routes);
	const location = useLocation();
	const [match] =
		matchRoutes(routes, location.pathname, '/representative') ?? [];

	return (
		<>
			<Sidebar routes={routes} indexLink='/representative' />
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

export default RepresentativeLayout;
