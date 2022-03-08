// reactstrap components
import { Row, Col } from 'reactstrap';

const Footer = () => {
	return (
		<footer className='footer'>
			<Row className='align-items-center justify-content-xl-between'>
				<Col xl='6'>
					<div className='copyright text-center text-xl-left text-muted'>
						© {new Date().getFullYear()}{' '}
						<span className='font-weight-bold'>
							Project Aid Hub
						</span>
					</div>
				</Col>
			</Row>
		</footer>
	);
};

export default Footer;
