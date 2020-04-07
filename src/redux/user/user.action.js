import { userActionTypes } from './user.types';

export const googleSignInstart = () => ({
	type: userActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = signInCredentials => ({
	type: userActionTypes.EMAIL_SIGN_START,
	payload: signInCredentials,
});

export const signInSuccess = user => ({
	type: userActionTypes.SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailure = error => ({
	type: userActionTypes.SIGN_IN_FAILURE,
	payload: error,
});

export const signUpStart = userCredentials => ({
	type: userActionTypes.SIGN_UP_START,
	payload: userCredentials,
});

export const signUpSuccess = () => ({
	type: userActionTypes.SIGN_UP_SUCCESS,
});

export const signUpFailure = error => ({
	type: userActionTypes.SIGN_UP_FAILURE,
	payload: error.message,
});

export const signOutStart = () => ({
	type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
	type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = error => ({
	type: userActionTypes.SIGN_OUT_FAILURE,
	payload: error.message,
});

export const checkUserSession = () => ({
	type: userActionTypes.CHECK_USER_SESSION,
});
