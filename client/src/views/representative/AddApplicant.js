// reactstrap components
import { Card, Col, Container, Row, CardHeader, CardBody } from 'reactstrap';

import Alert from 'components/UI/Alert';

import { useState, useEffect } from 'react';

import useAlert from 'hooks/useAlert';
import { useHistory } from 'react-router-dom';
import OrgHeader from 'components/Headers/OrganizationHeader';
import ApplicantForm from 'components/Forms/ApplicantForm';
import useAuth from 'hooks/useAuth';
import axios from 'api/axios';

const AddApplicant = () => {
	const { success } = useAlert();
	const history = useHistory();

	const { auth, setAuth } = useAuth();

	const [organization, setOrganization] = useState({});

	const { error: alertError } = useAlert();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getApplicants = async () => {
			try {
				const orgResponse = await axios.get(
					`/organizations/${auth.user.orgId}`
				);

				isMounted && setOrganization(orgResponse.data.result);
			} catch (err) {
				if (err.response) {
					const { error, code } = err.response.data;
					alertError(`An ${code} error occurred`, error.message);
				}
			}
		};

		getApplicants();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [alertError, auth]);

	const onSuccessRegister = (data) => {
		success('success', 'Applicant was successfully registered');
		setAuth((prev) => {
			return { ...prev, newApplicant: data.result };
		});
		history.push('/representative/index');
	};

	console.log(organization);

	return (
		<>
			<OrgHeader organization={organization} />
			<Container className='mt--7' fluid>
				<Alert />
				<Card className='bg-secondary shadow'>
					<CardHeader className='bg-white border-0'>
						<Row className='align-items-center'>
							<Col xs='8'>
								<h3 className='mb-0'>Add New Applicant</h3>
							</Col>
						</Row>
					</CardHeader>
					<CardBody>
						<ApplicantForm
							organizations={[organization]}
							onSuccessRegister={onSuccessRegister}
						/>
					</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default AddApplicant;
