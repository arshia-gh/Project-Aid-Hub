import { DocumentUploadForm } from 'components/Forms/DocumentUploadForm';
import useAuth from 'hooks/useAuth';

const { Card, CardHeader, Row, Col, CardBody } = require('reactstrap');

const AddDocument = () => {
	const { auth } = useAuth();

	return (
		<Card className='bg-secondary shadow'>
			<CardHeader className='bg-white border-0'>
				<Row className='align-items-center'>
					<Col xs='8'>
						<h3 className='mb-0'>Add New Document</h3>
					</Col>
				</Row>
			</CardHeader>
			<CardBody>
				<DocumentUploadForm applicant={auth.user} />
			</CardBody>
		</Card>
	);
};

export default AddDocument;
