import React, { useState } from 'react';

import { connect } from 'react-redux';
import { emailSignInStart } from '../../redux/user/user.action';
import FormInput from '../form-input/form-input.component';

import Button from '../btn/btn.component';

import './signin.styles.scss';

const SignIn = ({ dispatch, setShowSignUp }) => {
	const [signInCredentials, setSignInCredentials] = useState({
		email: '',
		password: '',
	});

	const [occupation, setOccupation] = useState(true);

	const handleChange = event => {
		const { name, value } = event.target;
		setSignInCredentials({ ...signInCredentials, [name]: value });
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (!password) {
			alert('password field cannot be empty');
			return;
		}

		dispatch(
			emailSignInStart({
				...signInCredentials,
				occupation: occupation ? 'patient' : 'doctor',
			}),
		);
	};

	const { email, password } = signInCredentials;

	return (
		<form onSubmit={handleSubmit} className="sign-up-form">
			<div className="form__title">
				Sign In as a{`${occupation ? ' patient' : ' doctor'}`}
			</div>
			<div
				onClick={() => {
					setOccupation(!occupation);
				}}
				className="switch_button"
			>
				{occupation === true ? 'Switch to medical doctor' : 'Switch to patient'}
			</div>
			<FormInput
				type="email"
				value={email}
				handleChange={handleChange}
				name="email"
				placeholder="Email"
			/>
			<FormInput
				type="password"
				value={password}
				handleChange={handleChange}
				name="password"
				placeholder="Password"
			/>
			<Button placeholder="Sign In" />

			<div className="auth__bottom">
				<h3 className="auth__swap" onClick={() => setShowSignUp(true)}>
					Don't hane an account?
					<span className="auth__swap-main"> Sign Up</span>
				</h3>
				<h3 className="auth__swap">Forgot password</h3>
			</div>
		</form>
	);
};

export default connect(null)(SignIn);
