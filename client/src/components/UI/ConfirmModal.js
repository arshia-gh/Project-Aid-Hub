import { useImperativeHandle, useState, forwardRef } from 'react';
import { Badge, Button, Card, CardBody, Input, Modal } from 'reactstrap';

export const ControlledModal = forwardRef(({ onClose }, ref) => {
	const [isOpen, setOpen] = useState(false);
	const [applicant, setApplicant] = useState({ username: '', password: '' });

	const toggleModal = () => {
		setOpen((prev) => !prev);
	};

	useImperativeHandle(ref, () => ({
		toggleModal,
		setApplicant,
	}));

	return (
		<Modal
			className='modal-dialog-centered modal-danger'
			contentClassName='bg-gradient-success'
			backdrop='static'
			isOpen={isOpen}
			toggle={toggleModal}>
			<div className='modal-header'>
				<h6 className='modal-title' id='modal-title-notification'>
					Credentials Confirmation
				</h6>
				<button
					aria-label='Close'
					className='close'
					data-dismiss='modal'
					type='button'
					onClick={toggleModal}>
					<span aria-hidden={true}>×</span>
				</button>
			</div>
			<div className='modal-body'>
				<div className='py-3 text-center'>
					<i className='ni ni-bell-55 ni-3x' />
					<h4 className='heading mt-4'>Registration Successful</h4>
					<p>You may use the below credentials to login</p>
					<Card className='center mb-2 mb-lg-0 w-75'>
						<CardBody className='d-flex flex-column align-items-start '>
							<Badge
								color='success'
								className='small text-dark mb-1'>
								Username
							</Badge>
							<Input
								readOnly
								value={applicant.username}
								className='mb-4'
							/>
							<Badge
								color='success'
								className='small text-dark mb-1'>
								Password
							</Badge>
							<Input readOnly value={applicant.password} />
						</CardBody>
					</Card>
				</div>
			</div>
			<div className='modal-footer'>
				<Button
					className='mx-auto btn-white'
					color='default'
					data-dismiss='modal'
					type='button'
					onClick={() => {
						toggleModal();
						onClose();
					}}>
					Confirm
				</Button>
			</div>
		</Modal>
	);
});
