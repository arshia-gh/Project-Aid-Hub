import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';

import AdminLayout from 'layouts/Admin.js';
import AuthLayout from 'layouts/Auth.js';
import ApplicantLayout from 'layouts/Applicant.js';
import RepresentativeLayout from 'layouts/Representative.js';
import { AlertProvider } from 'contexts/AlertProvider';
import { AuthProvider } from 'contexts/AuthProvider';

ReactDOM.render(
	<AuthProvider>
		<AlertProvider>
			<BrowserRouter>
				<Switch>
					<Route
						path='/admin'
						render={(props) => <AdminLayout {...props} />}
					/>
					<Route
						path='/applicant'
						render={(props) => <ApplicantLayout {...props} />}
					/>
					<Route
						path='/representative'
						render={(props) => <RepresentativeLayout {...props} />}
					/>
					<Route
						path='/auth'
						render={(props) => <AuthLayout {...props} />}
					/>
					<Redirect from='*' to='/auth' />
				</Switch>
			</BrowserRouter>
		</AlertProvider>
	</AuthProvider>,
	document.getElementById('root')
);
