// reactstrap components
import useAuth from 'hooks/useAuth';
import { Container, Row, Col } from 'reactstrap';

const UserHeader = () => {
	const { auth } = useAuth();
	return (
		<>
			<div
				className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
				style={{
					minHeight: '600px',
					backgroundImage:
						'url(' +
						require('../../assets/img/theme/user-profile.jpg')
							.default +
						')',
					backgroundSize: 'cover',
					backgroundPosition: 'center top',
				}}>
				{/* Mask */}
				<span className='mask bg-gradient-default opacity-8' />
				{/* Header container */}
				<Container className='d-flex align-items-center' fluid>
					<Row>
						<Col lg='7' md='10'>
							<h1 className='display-2 text-white'>
								{auth.user.fullname}
							</h1>
							<p className='text-white mt-0 mb-5'>
								This is your profile page. You can view your
								registration details
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default UserHeader;
