import React, { useState } from 'react';

//redux part
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.action';

//Ui part
import FormInput from '../form-input/form-input.component';
import Button from '../btn/btn.component';
import './signup.styles.scss';

const SignUp = ({ dispatch, setShowSignUp }) => {
	const [signUpCredentials, setSignUpCredentials] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstname: '',
		surname: '',
	});

	const handleChange = event => {
		const { name, value } = event.target;
		setSignUpCredentials({ ...signUpCredentials, [name]: value });
	};

	const _handleSubmit = event => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert('passwords dont match');
			return;
		}

		dispatch(signUpStart(signUpCredentials));
	};

	const {
		email,
		password,
		firstname,
		surname,
		confirmPassword,
	} = signUpCredentials;

	return (
		<form onSubmit={_handleSubmit} className="sign-up-form">
			<div className="form__title">Sign Up</div>
			<h3 className="form_text">Plese enter yor appropriate credentials</h3>
			<FormInput
				type="text"
				value={firstname}
				handleChange={handleChange}
				name="firstname"
				placeholder="Firstname"
			/>
			<FormInput
				type="text"
				value={surname}
				handleChange={handleChange}
				name="surname"
				placeholder="Surname"
			/>
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
			<FormInput
				type="password"
				value={confirmPassword}
				handleChange={handleChange}
				name="confirmPassword"
				placeholder="Confirm password"
			/>
			<Button placeholder="Sign Up" />
			<div className="auth__bottom">
				<h3 className="auth__swap" onClick={() => setShowSignUp(false)}>
					Alreday hane an account?
					<span className="auth__swap-main"> Sign In</span>
				</h3>
				<h3 className="auth__swap">Forgot password</h3>
			</div>
		</form>
	);
};

export default connect(null)(SignUp);
