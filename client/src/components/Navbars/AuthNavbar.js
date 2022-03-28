import { Link } from 'react-router-dom';
// reactstrap components
import {
	UncontrolledCollapse,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap';

const AuthNavbar = () => {
	return (
		<>
			<Navbar
				className='navbar-top navbar-horizontal navbar-dark'
				expand='md'>
				<Container className='px-4'>
					<NavbarBrand to='/' tag={Link}>
						<img
							alt='Project Aid Hub logo'
							src={
								require('../../assets/img/brand/logo-white.svg')
									.default
							}
						/>
					</NavbarBrand>
					<button
						className='navbar-toggler'
						id='navbar-collapse-main'>
						<span className='navbar-toggler-icon' />
					</button>
					<UncontrolledCollapse
						navbar
						toggler='#navbar-collapse-main'>
						<div className='navbar-collapse-header d-md-none'>
							<Row>
								<Col className='collapse-brand' xs='6'>
									<Link to='/'>
										<img
											alt='Project Aid Hub logo'
											src={
												require('../../assets/img/brand/logo-color.svg')
													.default
											}
										/>
									</Link>
								</Col>
								<Col className='collapse-close' xs='6'>
									<button
										className='navbar-toggler'
										id='navbar-collapse-main'>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<NavLink
									className='nav-link-icon'
									to='register'
									tag={Link}>
									<i className='ni ni-circle-08' />
									<span className='nav-link-inner--text'>
										Register
									</span>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className='nav-link-icon'
									to='login/user'
									tag={Link}>
									<i className='ni ni-key-25' />
									<span className='nav-link-inner--text'>
										Login
									</span>
								</NavLink>
							</NavItem>
						</Nav>
					</UncontrolledCollapse>
				</Container>
			</Navbar>
		</>
	);
};

export default AuthNavbar;
