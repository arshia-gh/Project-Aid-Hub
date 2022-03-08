// reactstrap components
import ApplicantForm from 'components/Forms/ApplicantForm';
import { Card, CardBody, Col, Badge } from 'reactstrap';
import { useEffect, useState } from 'react';
import axios from 'api/axios';
import useAlert from 'hooks/useAlert';
import useAuth from 'hooks/useAuth';
import Alert from 'components/UI/Alert';

const Register = () => {
	const [organizations, setOrganizations] = useState([]);
	const { error: alertError } = useAlert();
	const { setAuth } = useAuth();

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
				const { error, code } = err.response.data;
				alertError(`An ${code} error occurred`, error.message);
			}
		};

		getOrganizations();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [alertError]);

	const onSuccessRegister = async (data) => {
		setAuth({
			user: data.result,
			role: data.result.userType,
		});
	};

	return (
		<>
			<Col lg='6' md='8'>
				<Card className='bg-secondary shadow border-0'>
					<CardBody className='px-lg-5 py-lg-5'>
						<Alert />
						{organizations.length === 0 ? (
							<Badge color='warning'>
								No organization was found
							</Badge>
						) : (
							<ApplicantForm
								organizations={organizations}
								onSuccessRegister={onSuccessRegister}
							/>
						)}
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

export default Register;
