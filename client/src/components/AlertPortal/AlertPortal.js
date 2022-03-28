import ReactDOM from 'react-dom';
import { useAlertPortal } from 'hooks';
import { Col } from 'reactstrap';
import { useAlerts } from 'hooks';
import { Alert } from 'components/UI/Alert/Alert';
import { useEffect } from 'react';

export const AlertPortal = ({ autoClose, autoCloseTime = 3000 }) => {
	const { loaded, portalId } = useAlertPortal();
	const { alerts, removeAlert } = useAlerts();

	useEffect(() => {
		if (autoClose && alerts.length) {
			const id = alerts[alerts.length - 1].id;
			setTimeout(() => removeAlert(id), autoCloseTime);
		}
	}, [alerts, autoClose, autoCloseTime, removeAlert]);

	return loaded ? (
		ReactDOM.createPortal(
			<Col md={12} lg={4} xl={3} className='ml-auto'>
				{alerts.map((a) => (
					<Alert
						key={a.id}
						id={a.id}
						title={a.title}
						message={a.message}
						mode={a.mode}
						onClose={() => removeAlert(a.id)}
					/>
				))}
			</Col>,
			document.getElementById(portalId)
		)
	) : (
		<></>
	);
};
