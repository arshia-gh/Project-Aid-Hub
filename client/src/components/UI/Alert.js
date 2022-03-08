import { AlertContext } from 'contexts/AlertProvider';
import { useContext } from 'react';
import { UncontrolledAlert } from 'reactstrap';

const Alert = () => {
	const { alert, alertContent } = useContext(AlertContext);

	if (alert == null) return null;

	return (
		<UncontrolledAlert color={alert} fade={false}>
			<span className='alert-inner--text'>
				<strong>{alertContent.title}</strong> {alertContent.message}
			</span>
		</UncontrolledAlert>
	);
};

export default Alert;
