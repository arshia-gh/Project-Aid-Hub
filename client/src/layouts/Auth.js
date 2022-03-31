import React from 'react';
import { Link, Navigate, useRoutes } from 'react-router-dom';
// reactstrap components
import { Container, Row, Col, Button } from 'reactstrap';

// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import AuthFooter from 'components/Footers/AuthFooter.js';

import Register from 'views/auth/Register';
import Login from 'layouts/Login';

const routes = [
	{
		path: 'login/*',
		name: 'Login',
		element: <Login />,
	},
	{
		path: 'register',
		name: 'Register',
		element: <Register />,
	},
	{},
];

const AuthLayout = () => {
	const mainContent = React.useRef(null);
	const routeResults = useRoutes(routes);

	React.useEffect(() => {
		document.body.classList.add('bg-default');
		return () => {
			document.body.classList.remove('bg-default');
		};
	}, []);

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
									<Button tag={Link} to='/public/appeals'>
										View Appeals
									</Button>
								</Col>
							</Row>
						</div>
					</Container>
				</div>
				{/* Page content */}
				<Container className='mt--8 pb-5'>
					<Row className='justify-content-center'>
						{routeResults || <Navigate to='login/user' replace />}
					</Row>
				</Container>
			</div>
			<AuthFooter />
		</>
	);
};

export default AuthLayout;
