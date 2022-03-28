import axios from 'api/axios';
import UserLoginForm from 'components/Forms/Login/UserLoginForm';
import { useAlerts } from 'hooks';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function UserLogin({ success }) {
	const { addAlert } = useAlerts();
	const authHandler = async (data) => {
		try {
			const response = await axios.post('/login', {
				username: data.username,
				password: data.password,
			});

			success(response.data);
		} catch (err) {
			if (err.response?.data) {
				const { error } = err.response?.data;
				addAlert({
					title: 'Authentication Failed',
					message: error.message,
					mode: 'danger',
				});
			}
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<div className='text-muted'>
					<small>You are signing in as </small>
				</div>
				<Button
					tag={Link}
					className='btn-icon btn-2'
					color='primary'
					type='button'
					to='../admin'>
					<span className='btn-inner--text'>User</span>
					<span className='btn-inner--icon'>
						<i className='fas fa-user' />
					</span>
				</Button>
			</div>
			<hr />
			<UserLoginForm authHandler={authHandler} />
		</>
	);
}

export default UserLogin;
