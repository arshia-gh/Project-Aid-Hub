/*eslint-disable*/
import { useState } from 'react';
import { NavLink as NavLinkRRD, Link, useNavigate } from 'react-router-dom';

// reactstrap components
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap';
import useAuth from 'hooks/useAuth';

const Sidebar = (props) => {
	const { routes, indexLink } = props;

	const [collapseOpen, setCollapseOpen] = useState();
	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setCollapseOpen((data) => !data);
	};
	// closes the collapse
	const closeCollapse = () => {
		setCollapseOpen(false);
	};

	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	// creates the links that appear in the left menu / Sidebar
	const createLinks = (routes) => {
		return routes.map((route, key) => {
			if (route.invisible) return null;
			return (
				<NavItem key={key}>
					<NavLink
						to={route.index ? indexLink : route.path}
						end={route.index}
						tag={NavLinkRRD}
						onClick={closeCollapse}>
						<i className={route.icon} />
						{route.name}
					</NavLink>
				</NavItem>
			);
		});
	};

	return (
		<Navbar
			className='navbar-vertical fixed-left navbar-light bg-white'
			expand='md'
			id='sidenav-main'>
			<Container fluid>
				{/* Toggler */}
				<button
					className='navbar-toggler'
					type='button'
					onClick={toggleCollapse}>
					<span className='navbar-toggler-icon' />
				</button>
				{/* Brand */}
				<NavbarBrand
					className='pt-0 py-0 d-flex justify-content-center align-items-center'
					tag={Link}
					to={indexLink}>
					<img
						alt='Project Aid Hub logo'
						className='navbar-brand-img h-auto'
						style={{
							minWidth: '100%',
							minHeight: '7rem',
							objectFit: 'cover',
						}}
						src={require('assets/img/brand/logo-1.png').default}
					/>
				</NavbarBrand>
				{/* User */}
				{auth != null && (
					<Nav className='align-items-center d-md-none'>
						<UncontrolledDropdown nav>
							<DropdownToggle nav>
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
								</Media>
							</DropdownToggle>
							<DropdownMenu className='dropdown-menu-arrow' right>
								<DropdownItem
									className='noti-title'
									header
									tag='div'>
									<h6 className='text-overflow m-0'>
										Welcome!
									</h6>
								</DropdownItem>
								<DropdownItem
									onClick={() => {
										navigate('/login/user');
										setAuth(null);
									}}>
									<i className='ni ni-user-run' />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				)}
				{/* Collapse */}
				<Collapse navbar isOpen={collapseOpen}>
					{/* Collapse header */}
					<div className='navbar-collapse-header d-md-none'>
						<Row>
							<Col className='collapse-brand' xs='6'>
								<img
									alt='Project Aid Hub logo'
									className='navbar-brand-img h-auto'
									style={{
										minWidth: '100%',
										minHeight: '7rem',
										objectFit: 'cover',
									}}
									src={
										require('assets/img/brand/logo-1.png')
											.default
									}
								/>
							</Col>
							<Col className='collapse-close' xs='6'>
								<button
									className='navbar-toggler'
									type='button'
									onClick={toggleCollapse}>
									<span />
									<span />
								</button>
							</Col>
						</Row>
					</div>
					{/* Navigation */}
					<Nav navbar>{createLinks(routes)}</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

export default Sidebar;
