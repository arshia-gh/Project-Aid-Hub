import { useEffect, useState } from 'react';
import { uuid } from 'shared';

export const useAlertPortal = () => {
	const [loaded, setLoaded] = useState();
	const [portalId] = useState(`alert-portal-${uuid()}`);

	useEffect(() => {
		const div = document.createElement('div');
		div.id = portalId;
		div.className = 'fixed-bottom mb-1';
		document.getElementsByTagName('body')[0].prepend(div);

		setLoaded(true);

		return () => {
			document.getElementById(portalId).remove();
		};
	}, [portalId]);

	return { loaded, portalId };
};
