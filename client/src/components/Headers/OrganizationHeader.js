// reactstrap components
import { Container, Row, Col } from 'reactstrap';

const OrganizationHeader = ({ organization = {}, children }) => {
	return (
		<div
			className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
			style={{
				minHeight: '500px',
				backgroundImage:
					'url(' +
					require('../../assets/img/theme/organization-profile.jpg')
						.default +
					')',
				backgroundSize: 'cover',
				backgroundPosition: 'center top',
			}}>
			{/* Mask */}
			<span className='mask bg-gradient-default opacity-8' />
			{/* Header container */}
			<Container className='d-flex align-items-center' fluid>
				<Row className='w-100'>
					<Col className='text-center text-md-left'>
						<h1 className='display-2 text-white'>
							{organization.name}
						</h1>
						<h2 className='text-white font-weight-light font-italic'>
							{organization.address}
						</h2>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default OrganizationHeader;
