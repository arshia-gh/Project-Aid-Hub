import { useState, useEffect } from 'react';

import axios from 'api/axios';

// reactstrap components
import { Card, Col, Container, Row, CardHeader, CardBody } from 'reactstrap';

import Alert from 'components/UI/Alert';

import { useParams } from 'react-router-dom';
import RepresentativeForm from 'components/Forms/RepresentativeForm';
import useAlert from 'hooks/useAlert';
import { useHistory } from 'react-router-dom';
import OrgHeader from 'components/Headers/OrganizationHeader';

const AddRepresentative = (props) => {
	const params = useParams();
	const [organization, setOrganization] = useState({});

	const { error, success } = useAlert();
	const history = useHistory();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getOrganization = async () => {
			try {
				const response = await axios.get(
					`/organizations/${params.id}`,
					{
						signal: controller.signal,
					}
				);

				isMounted && setOrganization(response.data.result);
			} catch (err) {
				console.error(err);
			}
		};

		getOrganization();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [params.id]);

	const onSuccessRegister = (data) => {
		if (data.error) {
			error(`Error ${data.code}`, `Error ${data.message}`);
		} else {
			success('Success', 'Representative was successfully created');
			history.push(`/admin/organizations/${organization.id}`);
		}
	};

	return (
		<>
			<OrgHeader organization={organization} />
			<Container className='mt--7' fluid>
				<Alert />
				<Card className='bg-secondary shadow'>
					<CardHeader className='bg-white border-0'>
						<Row className='align-items-center'>
							<Col xs='8'>
								<h3 className='mb-0'>Add New Representative</h3>
							</Col>
						</Row>
					</CardHeader>
					<CardBody>
						<RepresentativeForm
							organization={organization}
							onSuccessRegister={onSuccessRegister}
						/>
					</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default AddRepresentative;
