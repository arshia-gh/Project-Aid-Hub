import React from 'react';
import {
	useRoutes,
	useLocation,
	matchRoutes,
	Navigate,
} from 'react-router-dom';

// reactstrap components
import { Container } from 'reactstrap';

// core components
import DashboardNavbar from 'components/Navbars/DashboardNavbar.js';
import DashboardFooter from 'components/Footers/DashboardFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import AddRepresentative from 'views/admin/AddRepresentative';
import ViewOrganization from 'views/admin/ViewOrganization';
import ViewAllOrganizations from 'views/admin/ViewAllOrganizations';
import AddOrganization from 'views/admin/AddOrganization';

const routes = [
	{
		index: true,
		name: 'Dashboard',
		icon: 'fas fa-book text-blue',
		element: <ViewAllOrganizations />,
	},
	{
		path: 'organizations/:id/new-representative',
		name: 'Add Representative',
		element: <AddRepresentative />,
		invisible: true,
	},
	{
		path: 'organizations/:id',
		name: 'View Organization',
		element: <ViewOrganization />,
		invisible: true,
	},
	{
		path: 'new-organization',
		name: 'Add Organization',
		element: <AddOrganization />,
		icon: 'fas fa-plus-square text-warning',
	},
];

const AdminLayout = () => {
	const routeResults = useRoutes(routes);
	const location = useLocation();
	const [match] = matchRoutes(routes, location.pathname, '/admin') ?? [];

	return (
		<>
			<Sidebar routes={routes} indexLink='/admin' />
			<div className='main-content'>
				<DashboardNavbar brandText={match?.route.name || 'Dashboard'} />
				{routeResults || <Navigate to='./' replace />}
				<Container fluid>
					<DashboardFooter />
				</Container>
			</div>
		</>
	);
};

export default AdminLayout;
