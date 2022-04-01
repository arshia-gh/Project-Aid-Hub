// reactstrap components
import {
	Card,
	CardBody,
	FormGroup,
	Input,
	Row,
	Col,
	Badge,
	Spinner,
	CardFooter,
	Table,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

// core components
import { useApplicantDocumentsQuery, useApplicantQuery } from 'hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReturnButton from 'components/UI/ReturnButton';

const ViewApplicantProfile = () => {
	const { IDno } = useParams();
	const navigate = useNavigate();
	const { isError, isLoading, data: applicant } = useApplicantQuery(IDno);
	const { isLoading: isDocLoading, data: documents } =
		useApplicantDocumentsQuery(IDno);

	if (isError) {
		navigate(-1, { replace: true });
	}
	return (
		<Card className='bg-secondary shadow'>
			<CardBody>
				{isLoading ? (
					<div className='d-flex align-items-center ml-4 mb-4'>
						<Badge color='primary'>
							<Spinner />
						</Badge>
					</div>
				) : (
					<>
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
											value={applicant.username}
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
												'RM' + applicant.householdIncome
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
											value={applicant.fullname}
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
											value={applicant.IDno}
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
												applicant.email ??
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
												applicant.mobileNo ??
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
											value={applicant.address}
											type='textarea'
											readOnly
										/>
									</FormGroup>
								</Col>
							</Row>
						</div>
						<hr className='my-4' />
						{/* Document */}
						<h6 className='heading-small text-muted mb-4'>
							Documents
						</h6>
						<div className='pl-lg-4'>
							<Card>
								<CardBody>
									{isDocLoading ? (
										<div className='d-flex align-items-center ml-4 mb-4'>
											<Badge color='primary'>
												<Spinner />
											</Badge>
										</div>
									) : (
										<Table
											className='align-items-center table-flush'
											responsive>
											<thead className='thead-light'>
												<tr>
													<th>Filename</th>
													<th>Description</th>
													<th />
												</tr>
											</thead>
											<tbody>
												{documents.map((doc) => (
													<tr key={doc.id}>
														<td>{doc.filename}</td>
														<td>
															{doc.description}
														</td>
														<td>
															<UncontrolledDropdown>
																<DropdownToggle
																	className='btn-icon-only text-light'
																	role='button'
																	size='sm'
																	color=''
																	onClick={(
																		e
																	) =>
																		e.preventDefault()
																	}>
																	<i className='fas fa-ellipsis-v' />
																</DropdownToggle>
																<DropdownMenu
																	className='dropdown-menu-arrow'
																	right>
																	<a
																		href={
																			doc.url
																		}
																		rel='noreferrer'
																		target='_blank'>
																		<DropdownItem>
																			Open
																			File
																		</DropdownItem>
																	</a>
																</DropdownMenu>
															</UncontrolledDropdown>
														</td>
													</tr>
												))}
											</tbody>
										</Table>
									)}
								</CardBody>
							</Card>
						</div>
					</>
				)}
			</CardBody>
			<CardFooter className='d-flex'>
				<ReturnButton className='mr-auto' />
				<Button color='default' size='sm' tag={Link} to='new-document'>
					Add Document
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ViewApplicantProfile;
