// reactstrap components
import { Container } from 'reactstrap';

const DashboardHeader = () => {
	return (
		<>
			<div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
				<Container fluid>
					<div className='header-body'>{/* Card stats */}</div>
				</Container>
			</div>
		</>
	);
};

export default DashboardHeader;
