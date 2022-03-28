import AdminLoginForm from 'components/Forms/Login/AdminLoginForm';
import axios from 'api/axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAlerts } from 'hooks';

const AdminLogin = ({ success }) => {
	const { addAlert } = useAlerts();

	const authHandler = async (input) => {
		try {
			const response = await axios.post('/admin-login', {
				token: input.token,
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
					color='danger'
					type='button'
					to='../user'>
					<span className='btn-inner--text'>Admin</span>
					<span className='btn-inner--icon'>
						<i className='fas fa-user-cog' />
					</span>
				</Button>
			</div>
			<hr />
			<AdminLoginForm authHandler={authHandler} />
		</>
	);
};

export default AdminLogin;
