import { DocumentUploadForm } from 'components/Forms/DocumentUploadForm';
import { useApplicantQuery } from 'hooks';
import { useNavigate, useParams } from 'react-router-dom';

const {
	Card,
	CardHeader,
	Row,
	Col,
	CardBody,
	Badge,
	Spinner,
} = require('reactstrap');

const AddDocument = () => {
	const { IDno } = useParams();
	const navigate = useNavigate();
	const { isLoading, isError, data: applicant } = useApplicantQuery(IDno);

	if (isError) {
		navigate(-1, { replace: true });
	}

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
				{isLoading ? (
					<div className='d-flex align-items-center ml-4 mb-4'>
						<Badge color='primary'>
							<Spinner />
						</Badge>
					</div>
				) : (
					<DocumentUploadForm applicant={applicant} />
				)}
			</CardBody>
		</Card>
	);
};

export default AddDocument;
