import AdminIndex from 'views/admin/AdminIndex';
import ViewOrganization from 'views/admin/ViewOrganization';
import AddOrganization from 'views/admin/AddOrganization';
import Login from 'views/user/Login';
import Register from 'views/user/Register';
import Profile from 'views/applicant/Profile';
import AddRepresentative from 'views/admin/AddRepresentative';
import RepresentativeIndex from 'views/applicant/RepresentativeIndex';

var routes = [
	// {
	// 	path: '/icons',
	// 	name: 'Icons',
	// 	icon: 'ni ni-planet text-blue',
	// 	component: Icons,
	// 	layout: '/admin',
	// },
	{
		path: '/index',
		name: 'Profile',
		icon: 'ni ni-single-02 text-yellow',
		component: RepresentativeIndex,
		layout: '/representative',
	},
	{
		path: '/profile',
		name: 'Profile',
		icon: 'ni ni-single-02 text-yellow',
		component: Profile,
		layout: '/applicant',
	},

	{
		path: '/login',
		name: 'User Login',
		component: Login,
		layout: '/auth',
		invisible: true,
	},
	{
		path: '/register',
		name: 'Applicant Registration',
		component: Register,
		layout: '/auth',
		invisible: true,
	},
	// admin routes
	{
		path: '/organizations/:id/new-representative',
		name: 'Add Representative',
		component: AddRepresentative,
		layout: '/admin',
		invisible: true,
	},
	{
		path: '/organizations/:id',
		name: 'View Organization',
		component: ViewOrganization,
		layout: '/admin',
		invisible: true,
	},
	{
		path: '/organizations',
		name: 'Dashboard',
		icon: 'fas fa-book text-blue',
		component: AdminIndex,
		layout: '/admin',
	},
	{
		path: '/new-organization',
		name: 'Add Organization',
		component: AddOrganization,
		icon: 'fas fa-plus-square text-warning',
		layout: '/admin',
	},
];
export default routes;
