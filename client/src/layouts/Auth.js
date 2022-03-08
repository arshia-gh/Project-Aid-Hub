import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import AuthFooter from 'components/Footers/AuthFooter.js';

import routes from 'routes.js';
import useAuth from 'hooks/useAuth';

const AuthLayout = (props) => {
	const mainContent = React.useRef(null);
	const { auth } = useAuth();

	React.useEffect(() => {
		document.body.classList.add('bg-default');
		return () => {
			document.body.classList.remove('bg-default');
		};
	}, []);

	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/auth') {
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

	if (auth != null) {
		return (
			<Redirect
				to={
					auth.role === 'ADMIN'
						? '/admin'
						: auth.role === 'ORG_REPRESENTATIVE'
						? '/representative'
						: '/applicant'
				}
			/>
		);
	}

	return (
		<>
			<div className='main-content' ref={mainContent}>
				<AuthNavbar />
				<div className='header bg-gradient-info py-7 py-lg-8'>
					<Container>
						<div className='header-body text-center mb-7'>
							<Row className='justify-content-center'>
								<Col lg='5' md='6'>
									<h1 className='text-white'>
										Project Aid Hub
									</h1>
									<p className='text-lead text-light '>
										Don’t struggle alone, there’s more than
										enough kindness for everyone.
									</p>
								</Col>
							</Row>
						</div>
					</Container>
				</div>
				{/* Page content */}
				<Container className='mt--8 pb-5'>
					<Row className='justify-content-center'>
						<Switch>
							{getRoutes(routes)}
							<Redirect from='*' to='/auth/login' />
						</Switch>
					</Row>
				</Container>
			</div>
			<AuthFooter />
		</>
	);
};

export default AuthLayout;
