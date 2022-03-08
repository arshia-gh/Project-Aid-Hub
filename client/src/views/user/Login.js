import AdminLoginForm from 'components/Forms/Login/AdminLoginForm';
import UserLoginForm from 'components/Forms/Login/UserLoginForm';
import Alert from 'components/UI/Alert';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';

// reactstrap components
import { Button, Card, CardBody, Col } from 'reactstrap';

const Login = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	const { setAuth } = useAuth();

	const authHandler = async (data) => {
		const role = data.result.userType;

		setAuth({
			user: data.result,
			token: data.token,
			role: role,
		});
	};

	return (
		<>
			<Col lg='5' md='7'>
				<Card className='bg-secondary shadow border-0'>
					<CardBody className='px-lg-5 py-lg-5'>
						<Alert />
						<div className='d-flex justify-content-between align-items-center mb-4'>
							<div className='text-muted'>
								<small>You are signing in as </small>
							</div>
							<Button
								onClick={() => setIsAdmin((prev) => !prev)}
								className='btn-icon btn-2'
								color={isAdmin ? 'danger' : 'primary'}
								type='button'>
								<span className='btn-inner--text'>
									{isAdmin ? 'Admin' : 'User'}
								</span>
								<span className='btn-inner--icon'>
									<i
										className={`fas ${
											isAdmin ? 'fa-user-cog' : 'fa-user'
										}`}></i>
								</span>
							</Button>
						</div>

						<hr />

						{isAdmin ? (
							<AdminLoginForm onSuccessAuth={authHandler} />
						) : (
							<UserLoginForm onSuccessAuth={authHandler} />
						)}
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

export default Login;
