import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import SignInSignUp from '../../components/sign-in-sign-up/sign-in-sign-up.component';

import './landing.styles.scss';

const LandingScreen = () => {
	return (
		<div className="landing">
			<div className="landing__top-background"></div>
			<ul className="landing__navigation">
				<div className="landing__navigation--logo">
					<div className="landing__navigation--logo_1">
						<Logo className="landing__navigation--logo_img" />
					</div>
				</div>
				<Link className="landing__navigation--options" to="/products">
					Product
				</Link>
				<Link className="landing__navigation--options" to="/services">
					Services
				</Link>
				<Link className="landing__navigation--options" to="pricing">
					Pricing
				</Link>
				<Link className="landing__navigation--options" to="/about">
					About
				</Link>
			</ul>
			<div className="landing__text">
				<h1 className="landing__text--main">Welcome to Blabber!</h1>
				<h1 className="landing__text--sub">
					the worlds best field service management platform for small to medium
					scale enterprises
				</h1>
			</div>
			<div className="landing__auth">
				<SignInSignUp />
			</div>
		</div>
	);
};

export default LandingScreen;
