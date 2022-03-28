import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';

import AdminLayout from 'layouts/Admin.js';
import AuthLayout from 'layouts/Auth.js';
import ApplicantLayout from 'layouts/Applicant.js';
import RepresentativeLayout from 'layouts/Representative.js';
import { AuthProvider } from 'contexts/AuthProvider';
import RequireAuth from 'components/Utils/RequireAuth';
import { AlertPortalProvider } from 'contexts/AlertPortalProvider';
import { AlertPortal } from 'components/AlertPortal';

ReactDOM.render(
	<AuthProvider>
		<AlertPortalProvider>
			<BrowserRouter>
				<AlertPortal autoClose />
				<Routes>
					<Route
						element={
							<RequireAuth
								allowedRole='ADMIN'
								onFailureUrl='/login/admin'
							/>
						}>
						<Route path='/admin/*' element={<AdminLayout />} />
					</Route>
					<Route
						element={
							<RequireAuth
								allowedRole='APPLICANT'
								onFailureUrl='/login/user'
							/>
						}>
						<Route
							path='/applicant/*'
							element={<ApplicantLayout />}
						/>
					</Route>
					<Route
						element={
							<RequireAuth
								allowedRole='ORG_REPRESENTATIVE'
								onFailureUrl='/login/user'
							/>
						}>
						<Route
							path='/representative/*'
							element={<RepresentativeLayout />}
						/>
					</Route>
					<Route path='*' element={<AuthLayout />} />
				</Routes>
			</BrowserRouter>
		</AlertPortalProvider>
	</AuthProvider>,
	document.getElementById('root')
);
