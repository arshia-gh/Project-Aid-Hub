import React from 'react';
import {
	Navigate,
	useLocation,
	matchRoutes,
	useRoutes,
} from 'react-router-dom';

// reactstrap components
import { Col, Container, Row } from 'reactstrap';

// core components
import DashboardNavbar from 'components/Navbars/DashboardNavbar.js';
import DashboardFooter from 'components/Footers/DashboardFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import AddApplicant from 'views/representative/AddApplicant';
import ViewApplicants from 'views/representative/ViewApplicants';
import AddAppeal from 'views/representative/AddAppeal';
import OrganizationHeader from 'components/Headers/OrganizationHeader';
import useAuth from 'hooks/useAuth';
import ViewOrgAppeals from 'views/representative/ViewOrgAppeals';
import ViewOrgAppeal from 'views/representative/ViewOrgAppeal';
import ViewContributions from 'views/representative/ViewContributions';
import AddContribution from 'views/representative/AddContribution';
import ViewApplicantProfile from 'views/representative/ViewApplicantProfile';
import ViewAppealDisbursements from 'views/representative/ViewAppealDisbursements';
import AddDisbursement from 'views/representative/AddDisbursement';
import ViewAvailableApplicants from 'views/representative/ViewAvailableApplicants';
import AddDocument from 'views/representative/AddDocument';

const routes = [
	{
		index: true,
		name: 'Dashboard',
		icon: 'fas fa-book-open text-primary',
		element: <ViewOrgAppeals />,
	},
	{
		path: 'appeals/:appealId',
		name: 'View Appeal Details',
		invisible: true,
		element: <ViewOrgAppeal />,
	},
	{
		path: 'appeals/:appealId/contributions',
		name: 'View Contributions',
		invisible: true,
		element: <ViewContributions />,
	},
	{
		path: 'appeals/:appealId/contributions/new',
		name: 'Record Contribution',
		invisible: true,
		element: <AddContribution />,
	},
	{
		path: 'appeals/:appealId/disbursements',
		name: 'View Disbursements',
		invisible: true,
		element: <ViewAppealDisbursements />,
	},
	{
		path: 'appeals/:appealId/available',
		name: 'View Available Applicants',
		invisible: true,
		element: <ViewAvailableApplicants />,
	},
	{
		path: 'appeals/:appealId/disbursements/new',
		name: 'Record Disbursement',
		invisible: true,
		element: <AddDisbursement />,
	},
	{
		path: 'applicants/:IDno',
		name: 'View Applicant Profile',
		invisible: true,
		element: <ViewApplicantProfile />,
	},
	{
		path: 'applicants/:IDno/new-document',
		name: 'Add New Document',
		invisible: true,
		element: <AddDocument />,
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
				<Container className='mt--7' fluid>
					<Row>
						<Col>
							{routeResults || (
								<Navigate to='/representative' replace />
							)}
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<DashboardFooter />
				</Container>
			</div>
		</>
	);
};

export default RepresentativeLayout;
