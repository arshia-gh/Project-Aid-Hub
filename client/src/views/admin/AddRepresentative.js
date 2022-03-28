import { useState, useEffect } from 'react';

import axios from 'api/axios';

// reactstrap components
import { Card, Container, CardHeader, CardBody } from 'reactstrap';

import RepresentativeForm from 'components/Forms/RepresentativeForm';
import { useNavigate, useParams } from 'react-router-dom';
import OrgHeader from 'components/Headers/OrganizationHeader';
import { useAlerts } from 'hooks';

const AddRepresentative = () => {
	const params = useParams();
	const [organization, setOrganization] = useState({});
	const { addAlert } = useAlerts();

	const navigate = useNavigate();

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
				if (err.response) {
					const { error, code } = err.response.data;
					addAlert({
						title: `An ${code} error occurred`,
						message: error.message,
						mode: 'danger',
					});
				}
			}
		};

		getOrganization();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [params, addAlert]);

	const onSuccess = () => {
		// success('Success', 'Representative was successfully created');
		navigate(`../organizations/${params.id}`, { replace: true });
	};

	return (
		<>
			<OrgHeader organization={organization} />
			<Container className='mt--7' fluid>
				<Card className='bg-secondary shadow'>
					<CardHeader className='bg-white border-0'>
						<h3 className='mb-0'>Add New Representative</h3>
					</CardHeader>
					<CardBody>
						<RepresentativeForm
							organization={organization}
							onSuccess={onSuccess}
						/>
					</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default AddRepresentative;
