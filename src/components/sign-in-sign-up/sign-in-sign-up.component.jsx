import React, { useState } from 'react';
import axios from 'axios';

import SignIn from '../sign-in/signin.component';
import SignUp from '../sign-up/signup.component';

const SignInSignUp = ({ setCurrentUser, setToken }) => {
	const [showSignUp, setShowSignUp] = useState(false);

	const __signup = async ({
		email,
		surname,
		firstname,
		password,
		mdcn,
		occupation,
		yearOfGraduation,
		age,
	}) => {
		try {
			const auth = await axios.post(
				`https://medicare-server.herokuapp.com/api/v1/auth/${
					occupation ? 'patient' : 'doctor'
				}/signup`,
				{
					email,
					surname,
					firstname,
					password,
					mdcn,
					yearOfGraduation,
					age,
				},
			);
			console.log(auth);
			setToken(auth.data.token);
			setCurrentUser(auth.data.currentUser);

			localStorage.setItem('token', auth.data.token);
		} catch (err) {
			console.log(err.response.data.error);
		}
	};

	const __signin = async ({ email, password, occupation }) => {
		try {
			let auth = await axios.post(
				`https://medicare-server.herokuapp.com/api/v1/auth/${
					occupation === 'doctor' ? 'doctor' : 'patient'
				}/signin`,
				{
					email,
					password,
				},
			);
			console.log(auth);
			setToken(auth.data.token);
			setCurrentUser(auth.data.currentUser);
			localStorage.setItem('token', auth.data.token);
		} catch (err) {
			console.log(err.response.data.error);
		}
	};

	return showSignUp ? (
		<SignUp handleSumit={__signup} setShowSignUp={setShowSignUp} />
	) : (
		<SignIn handleSumit={__signin} setShowSignUp={setShowSignUp} />
	);
};

export default SignInSignUp;
