import React, { useState } from 'react';
import axios from 'axios';

import SignIn from '../sign-in/signin.component';
import SignUp from '../sign-up/signup.component';

const baseurl = process.env.REACT_APP_BASE_URL;

const SignInSignUp = ({ setCurrentUser, setToken }) => {
	const [showSignUp, setShowSignUp] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [err, setErr] = useState('');

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
				`${baseurl}/api/v1/auth/${!occupation ? 'patient' : 'doctor'}/signup`,
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
			setErr(err.response.data.error.message);
			setIsFetching(false);
		}
	};

	const __signin = async ({ email, password, occupation }) => {
		try {
			let auth = await axios.post(
				`${baseurl}/api/v1/auth/${
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
			setErr(err.response.data.error.message);
			setIsFetching(false);
		}
	};

	return showSignUp ? (
		<SignUp
			err={err}
			setErr={setErr}
			isFetching={isFetching}
			setIsFetching={setIsFetching}
			handleSumit={__signup}
			setShowSignUp={setShowSignUp}
		/>
	) : (
		<SignIn
			err={err}
			setErr={setErr}
			isFetching={isFetching}
			setIsFetching={setIsFetching}
			handleSumit={__signin}
			setShowSignUp={setShowSignUp}
		/>
	);
};

export default SignInSignUp;
