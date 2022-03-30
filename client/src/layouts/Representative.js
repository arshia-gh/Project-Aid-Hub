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
import AddAppeal from 'views/representative/AddAppeal';
import OrganizationHeader from 'components/Headers/OrganizationHeader';
import useAuth from 'hooks/useAuth';
import ViewAppeals from 'views/representative/ViewAppeals';

const routes = [
	{
		index: true,
		name: 'Dashboard',
		icon: 'fas fa-book-open text-primary',
		element: <ViewAppeals />,
	},
	{
		path: 'applicants',
		name: 'Manage Applicants',
		icon: 'fas fa-users  text-primary',
		element: <ViewApplicants />,
	},
	{
		path: 'new-applicant',
		name: 'Register Applicant',
		icon: 'fas fa-user-plus  text-primary',
		element: <AddApplicant />,
	},
	{
		path: 'new-appeal',
		name: 'Create Appeal',
		icon: 'fas fa-first-aid  text-primary',
		element: <AddAppeal />,
	},
];

const RepresentativeLayout = () => {
	const routeResults = useRoutes(routes);
	const location = useLocation();
	const { auth } = useAuth();
	const [match] =
		matchRoutes(routes, location.pathname, '/representative') ?? [];

	return (
		<>
			<Sidebar routes={routes} indexLink='/representative' />
			<div className='main-content'>
				<DashboardNavbar brandText={match?.route.name || 'Dashboard'} />
				<OrganizationHeader organization={auth.user.Organization} />
				{routeResults || <Navigate to='profile' replace />}
				<Container fluid>
					<DashboardFooter />
				</Container>
			</div>
		</>
	);
};

export default RepresentativeLayout;
