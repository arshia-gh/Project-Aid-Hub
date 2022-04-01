import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// reactstrap components
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Navbar,
	Nav,
	Container,
	Media,
} from 'reactstrap';

const DashboardNavbar = (props) => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	return (
		<>
			<Navbar
				className='navbar-top navbar-dark'
				expand='md'
				id='navbar-main'>
				<Container fluid>
					<h1 className='h4 mb-0 text-white text-uppercase d-none d-md-inline-block'>
						{props.brandText}
					</h1>
					<Nav className='align-items-center d-none d-md-flex' navbar>
						{auth != null && (
							<UncontrolledDropdown nav>
								<DropdownToggle className='pr-0' nav>
									<Media className='align-items-center'>
										<span className='avatar avatar-sm rounded-circle'>
											<img
												alt='...'
												src={
													require('../../assets/img/theme/sample-avatar.png')
														.default
												}
											/>
										</span>
										<Media className='ml-2 d-none d-lg-block'>
											<span className='mb-0 text-sm font-weight-bold'>
												{auth && auth.user.fullname}
											</span>
										</Media>
									</Media>
								</DropdownToggle>
								<DropdownMenu
									className='dropdown-menu-arrow'
									right>
									<DropdownItem
										className='noti-title'
										header
										tag='div'>
										<h6 className='text-overflow m-0'>
											Welcome!
										</h6>
									</DropdownItem>
									{auth != null && (
										<DropdownItem
											onClick={() => {
												navigate('/login/user');
												setAuth(null);
											}}>
											<i className='ni ni-user-run' />
											<span>Logout</span>
										</DropdownItem>
									)}
								</DropdownMenu>
							</UncontrolledDropdown>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default DashboardNavbar;
