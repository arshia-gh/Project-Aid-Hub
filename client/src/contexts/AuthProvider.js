import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const savedAuth = JSON.parse(localStorage.getItem('auth'));
		setAuth(() => {
			setLoading(false);
			return savedAuth ?? null;
		});
	}, []);

	useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(auth));
	}, [auth]);

	return (
		<AuthContext.Provider value={{ isLoading, auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
