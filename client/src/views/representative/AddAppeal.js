const { CreateAppealForm } = require('components/Forms/CreateAppealForm');
const {
	Card,
	CardHeader,
	Row,
	Col,
	CardBody,
	Container,
} = require('reactstrap');

const AddAppeal = () => {
	return (
		<>
			<Container className='mt--7' fluid>
				<Card className='bg-secondary shadow'>
					<CardHeader className='bg-white border-0'>
						<Row className='align-items-center'>
							<Col xs='8'>
								<h3 className='mb-0'>Create New Appeal</h3>
							</Col>
						</Row>
					</CardHeader>
					<CardBody>
						<CreateAppealForm />
					</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default AddAppeal;
