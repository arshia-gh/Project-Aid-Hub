import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		setAuth(JSON.parse(window.localStorage.getItem('auth')));
	}, []);

	useEffect(() => {
		window.localStorage.setItem('auth', JSON.stringify(auth));
	}, [auth]);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{props.children}
		</AuthContext.Provider>
	);
};
