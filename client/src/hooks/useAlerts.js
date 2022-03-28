import { AlertPortalContext } from 'contexts/AlertPortalProvider';
import { useContext } from 'react';

export const useAlerts = () => {
	return useContext(AlertPortalContext);
};
