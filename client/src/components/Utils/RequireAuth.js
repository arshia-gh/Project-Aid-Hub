import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useAlerts } from 'hooks';

const RequireAuth = ({ allowedRole, onFailureUrl }) => {
	const { isLoading, auth } = useAuth();
	const location = useLocation();
	const { addAlert } = useAlerts();

	if (isLoading) return <></>;

	if (auth?.user == null) {
		addAlert({
			title: 'Unauthenticated Access',
			message: 'to view this page please proceed to authenticate',
			mode: 'warning',
		});
	} else if (auth?.role !== allowedRole) {
		addAlert({
			title: 'Unauthorized Access',
			message: 'you are not authorized to view this page',
			mode: 'warning',
		});
	}

	return auth?.role === allowedRole ? (
		<Outlet />
	) : (
		<Navigate to={onFailureUrl} state={{ from: location }} replace />
	);
};

export default RequireAuth;
