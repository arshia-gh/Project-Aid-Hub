import { useAlerts } from 'hooks';
import useAuth from 'hooks/useAuth';
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';

// reactstrap components
import { Card, CardBody, Col } from 'reactstrap';
import AdminLogin from 'views/auth/AdminLogin';
import UserLogin from 'views/auth/UserLogin';

const Login = () => {
	const { setAuth } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname;
	const { addAlert } = useAlerts();

	const authHandler = async (data) => {
		const {
			result: { userType: role, ...user },
			token,
		} = data;
		setAuth({
			user,
			role,
			token,
		});

		let dashboardUrl;
		if (role === 'ADMIN') {
			dashboardUrl = '/admin';
		} else if (role === 'ORG_REPRESENTATIVE') {
			dashboardUrl = '/representative';
		} else if (role === 'APPLICANT') {
			dashboardUrl = '/applicant';
		}

		addAlert({
			title: `Welcome back, ${user.fullname}`,
			message: `you have been logged in as a ${role}`,
			mode: 'primary',
		});

		navigate(from ?? dashboardUrl);
	};

	return (
		<Col lg='5' md='7'>
			<Card className='bg-secondary shadow border-0'>
				<CardBody className='px-lg-5 py-lg-5'>
					<Routes>
						<Route
							path='admin'
							element={<AdminLogin success={authHandler} />}
						/>
						<Route
							path='user'
							element={<UserLogin success={authHandler} />}
						/>
						<Route
							path='*'
							element={<Navigate to='user' replace />}
						/>
					</Routes>
				</CardBody>
			</Card>
		</Col>
	);
};

export default Login;
