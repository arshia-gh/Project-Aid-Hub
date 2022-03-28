import { Alert as AlertBS, Button } from 'reactstrap';

export const Alert = ({ title, message, mode, id, onClose }) => {
	return (
		<AlertBS color={mode} id={id}>
			<strong>{title}</strong> <p>{message}</p>
			<div className='d-flex justify-content-end'>
				<Button size='sm' onClick={onClose} variant={`outline-${mode}`}>
					Dismiss
				</Button>
			</div>
		</AlertBS>
	);
};
