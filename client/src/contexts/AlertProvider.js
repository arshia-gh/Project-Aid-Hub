import React, { useState, createContext } from 'react';

export const AlertContext = createContext();

export const AlertProvider = (props) => {
	const [alert, setAlert] = useState(null);
	const [alertContent, setAlertContent] = useState(null);

	return (
		<AlertContext.Provider
			value={{
				alert: alert,
				alertContent: alertContent,
				success: (title, message, timeout) => {
					setAlertContent({ title, message });
					setAlert('success');
					setTimeout(() => {
						setAlert(null);
					}, timeout * 1000 || 5000);
				},
				error: (title, message, timeout) => {
					setAlertContent({ title, message });
					setAlert('danger');
					setTimeout(() => {
						setAlert(null);
					}, timeout * 1000 || 5000);
				},
				clear: () => setAlert(null),
			}}>
			{props.children}
		</AlertContext.Provider>
	);
};
