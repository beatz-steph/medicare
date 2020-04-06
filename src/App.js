import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
//ui
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Landing from './screens/landing/landing.screen';
import Dashboard from './screens/dashboard//dashbaord.screens';

import './vendor.css';

const ModalHolder = styled.div`
	background-color: rgba(0, 0, 0, 0.85);
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 300;
`;

const App = () => {
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [currentUser, setCurrentUser] = useState('');

	useEffect(() => {
		async function getCurrentUser() {
			try {
				const auth = await axios.get(
					'https://medicare-server.herokuapp.com/api/v1/auth/',
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				setCurrentUser(auth.data);
			} catch (err) {
				console.log(err.response.data.error);
			}
		}

		getCurrentUser();
	}, [token]);

	return (
		<div>
			<Switch>
				<Route path="/" exact>
					{!currentUser ? (
						<Landing setToken={setToken} setCurrentUser={setCurrentUser} />
					) : (
						<Redirect to="/dashboard" />
					)}
				</Route>
				<Route
					path="/dashboard"
					render={(routeProps) => (
						<Dashboard
							{...routeProps}
							token={token}
							currentUser={currentUser}
						/>
					)}
				></Route>

				<div>set value</div>
			</Switch>
		</div>
	);
};

export default App;
