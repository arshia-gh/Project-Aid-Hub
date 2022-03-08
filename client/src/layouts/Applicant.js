import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// reactstrap components
import { Container } from 'reactstrap';

// core components
import DashboardNavbar from 'components/Navbars/DashboardNavbar.js';
import DashboardFooter from 'components/Footers/DashboardFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';
import useAuth from 'hooks/useAuth';

const ApplicantLayout = (props) => {
	const { auth } = useAuth();

	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/applicant') {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	const getBrandText = (path) => {
		for (let i = 0; i < routes.length; i++) {
			if (
				props.location.pathname.indexOf(
					routes[i].layout + routes[i].path
				) !== -1
			) {
				return routes[i].name;
			}
		}
		return 'Brand';
	};

	if (auth == null || auth.role !== 'APPLICANT') {
		return <Redirect to='/auth/login' />;
	}

	return (
		<>
			<Sidebar
				{...props}
				routes={routes.filter((route) => route.layout === '/applicant')}
				logo={{
					innerLink: '/applicant/profile',
					imgSrc: require('../assets/img/brand/logo-1.png').default,
					imgAlt: 'Project Aid Hub logo',
				}}
			/>
			<div className='main-content'>
				<DashboardNavbar
					{...props}
					brandText={getBrandText(props.location.pathname)}
				/>
				<Switch>
					{getRoutes(routes)}
					<Redirect from='*' to='/applicant/profile' />
				</Switch>
				<Container fluid>
					<DashboardFooter />
				</Container>
			</div>
		</>
	);
};

export default ApplicantLayout;
