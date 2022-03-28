// reactstrap components
import { Card, CardBody, Col, Badge } from 'reactstrap';

import { useEffect, useState } from 'react';
import axios from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from 'hooks';
import SFApplicantForm from 'components/Forms/SFApplicantForm';

const Register = () => {
	const [organizations, setOrganizations] = useState([]);
	const navigate = useNavigate();
	const { addAlert } = useAlerts();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getOrganizations = async () => {
			try {
				const response = await axios.get('/organizations', {
					signal: controller.signal,
				});

				isMounted && setOrganizations(response.data.result);
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

		getOrganizations();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [addAlert]);

	const redirectApplicant = () => {
		addAlert({
			title: 'Registration Successful',
			message: 'your login credentials will be sent to your email',
			mode: 'success',
		});
		navigate('/login/user');
	};

	return (
		<>
			<Col lg='6' md='8'>
				<Card className='bg-secondary shadow border-0'>
					<CardBody className='px-lg-5 py-lg-5'>
						{organizations.length === 0 ? (
							<Badge color='warning'>
								No organization was found
							</Badge>
						) : (
							<SFApplicantForm
								organizations={organizations}
								onSuccess={redirectApplicant}
							/>
						)}
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

export default Register;
