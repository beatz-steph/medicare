import React, { useState } from 'react';

import SignIn from '../sign-in/signin.component';
import SignUp from '../sign-up/signup.component';

const SignInSignUp = () => {
	const [showSignUp, setShowSignUp] = useState(false);

	return showSignUp ? (
		<SignUp setShowSignUp={setShowSignUp} />
	) : (
		<SignIn setShowSignUp={setShowSignUp} />
	);
};

export default SignInSignUp;
