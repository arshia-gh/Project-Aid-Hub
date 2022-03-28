import { createContext, useState } from 'react';
import { uuid } from 'shared';

export const AlertPortalContext = createContext();

export const AlertPortalProvider = ({ children }) => {
	const [alerts, setAlerts] = useState([]);

	const addAlert = (alert) => {
		setAlerts((prev) => {
			return [...prev, { ...alert, id: uuid() }];
		});
	};

	const removeAlert = (id) => {
		setAlerts((prev) => {
			return prev.filter((a) => a.id !== id);
		});
	};

	return (
		<AlertPortalContext.Provider
			value={{
				alerts,
				addAlert,
				removeAlert,
			}}>
			{children}
		</AlertPortalContext.Provider>
	);
};
