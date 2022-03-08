import { useContext } from 'react';
import { AlertContext } from 'contexts/AlertProvider';

const useAlert = () => {
	return useContext(AlertContext);
};

export default useAlert;
