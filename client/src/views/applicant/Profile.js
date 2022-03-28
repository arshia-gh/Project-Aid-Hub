// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Input,
	Container,
	Row,
	Col,
} from 'reactstrap';

// core components
import UserHeader from 'components/Headers/UserHeader.js';
import useAuth from 'hooks/useAuth';

const Profile = () => {
	const { auth } = useAuth();
	return (
		<>
			<UserHeader />
			{/* Page content */}
			<Container className='mt--7' fluid>
				<Row>
					<Col className='order-xl-1'>
						<Card className='bg-secondary shadow'>
							<CardHeader className='bg-white border-0'>
								<Row className='align-items-center'>
									<Col xs='8'>
										<h3 className='mb-0'>My account</h3>
									</Col>
									<Col className='text-right' xs='4'></Col>
								</Row>
							</CardHeader>
							<CardBody>
								<h6 className='heading-small text-muted mb-4'>
									User information
								</h6>
								<div className='pl-lg-4'>
									<Row>
										<Col lg='6'>
											<FormGroup>
												<label
													className='form-control-label'
													htmlFor='input-username'>
													Username
												</label>
												<Input
													className='form-control-alternative'
													value={auth.user.username}
													id='input-username'
													readOnly
													placeholder='Username'
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col lg='6'>
											<FormGroup>
												<label className='form-control-label'>
													Household Income
												</label>
												<Input
													className='form-control-alternative'
													type='text'
													readOnly
													value={
														'RM' +
														auth.user
															.householdIncome
													}
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col lg='6'>
											<FormGroup>
												<label className='form-control-label'>
													Full Name
												</label>
												<Input
													className='form-control-alternative'
													value={auth.user.fullname}
													readOnly
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col lg='6'>
											<FormGroup>
												<label className='form-control-label'>
													ID Number
												</label>
												<Input
													className='form-control-alternative'
													value={auth.user.IDno}
													readOnly
													type='text'
												/>
											</FormGroup>
										</Col>
									</Row>
								</div>
								<hr className='my-4' />
								{/* Address */}
								<h6 className='heading-small text-muted mb-4'>
									Contact information
								</h6>
								<div className='pl-lg-4'>
									<Row>
										<Col lg='6'>
											<FormGroup>
												<label className='form-control-label'>
													Email address
												</label>
												<Input
													className='form-control-alternative'
													value={
														auth.user.email ??
														'Not Available'
													}
													readOnly
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col lg='6'>
											<FormGroup>
												<label className='form-control-label'>
													Mobile Number
												</label>
												<Input
													className='form-control-alternative'
													value={
														auth.user.mobileNo ??
														'Not Available'
													}
													readOnly
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col md='12'>
											<FormGroup>
												<label className='form-control-label'>
													Address
												</label>
												<Input
													className='form-control-alternative'
													value={auth.user.address}
													type='textarea'
													readOnly
												/>
											</FormGroup>
										</Col>
									</Row>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Profile;
