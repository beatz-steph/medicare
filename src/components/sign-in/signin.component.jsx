import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import styled from 'styled-components';
import Loader from '../loader';

import './signin.styles.scss';

export const Btn = styled.button`
	align-self: center;
	position: relative;
	text-transform: uppercase;
	letter-spacing: 0.025em;
	font-size: 1.3rem;
	border-radius: 0.5rem;
	line-height: 1.5;
	border: 1px solid transparent;
	padding: 1rem 2.5rem;
	box-shadow: 0 0.5rem 1.5rem rgba($color: #000000, $alpha: 0.15);
	margin: 1rem 0 0 0;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	height: 4rem;
	width: 15rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	background-color: #1b82c7;
	transition: all 0.3s ease-in-out;

	&:active {
		transform: translate(0, 2px);
		outline: none;
		box-shadow: 0 0.3rem 1rem rgba($color: #000000, $alpha: 0.15);
	}
`;

const SignIn = ({
	handleSumit,
	setShowSignUp,
	setIsFetching,
	isFetching,
	err,
	setErr,
}) => {
	const [signInCredentials, setSignInCredentials] = useState({
		email: '',
		password: '',
	});

	const [occupation, setOccupation] = useState(true);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setSignInCredentials({ ...signInCredentials, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!password) {
			alert('password field cannot be empty');
			return;
		}

		handleSumit({
			...signInCredentials,
			occupation: occupation ? 'patient' : 'doctor',
		});

		setIsFetching(true);
		setErr('');
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
			{err ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						fontSize: '1.4rem',
						margin: '1rem 0',
					}}
					class="alert alert-danger"
					role="alert"
				>
					{err}
				</div>
			) : null}
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
			<Btn>{isFetching ? <Loader /> : 'Sign in'}</Btn>

			<div className="auth__bottom">
				<h3
					className="auth__swap"
					onClick={() => {
						setShowSignUp(true);
						setErr('');
					}}
				>
					Don't hane an account?
					<span className="auth__swap-main"> Sign Up</span>
				</h3>
				<h3 className="auth__swap">Forgot password</h3>
			</div>
		</form>
	);
};

export default SignIn;
