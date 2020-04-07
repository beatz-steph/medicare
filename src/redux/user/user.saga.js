import { put, takeLatest, call, all, select } from 'redux-saga/effects';
import { userActionTypes } from './user.types';
import { setToken } from '../token/token.functions';
import {
	signUpSuccess,
	signUpFailure,
	signInSuccess,
	signInFailure,
	signOutSuccess,
	signOutFailure,
	checkUserSession,
} from './user.action';
import axios from 'axios';

//import of other functions from other sagas
import { removeToken } from '../token/token.functions';

export function* EmailSignInStart({
	payload: { email, password, occupation },
}) {
	try {
		let auth = yield axios.post(
			`https://medicare-server.herokuapp.com/api/v1/auth/${
				occupation === 'doctor' ? 'doctor' : 'patient'
			}/signin`,
			{
				email,
				password,
			},
		);
		yield put(setToken(auth.data.token));
		yield put(signInSuccess(auth.data));
		yield put(checkUserSession());
	} catch (err) {
		yield put(signInFailure(err.response.data.error));
	}

	yield console.log({ email, password });
}

export function* onEmailSignInStart() {
	yield takeLatest(userActionTypes.EMAIL_SIGN_START, EmailSignInStart);
}

export function* SignUpStart({
	payload: {
		email,
		surname,
		firstname,
		password,
		mdcn,
		patient,
		yearOfGraduation,
		age,
	},
}) {
	try {
		const auth = yield axios.post(
			`https://medicare-server.herokuapp.com/api/v1/auth/${
				patient ? 'patient' : 'doctor'
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
		yield console.log(auth);
		yield put(signUpSuccess());
		yield put(setToken(auth.data.token));
		yield put(signInSuccess(auth.data.user));
		yield put(checkUserSession());
	} catch (err) {
		yield put(signUpFailure(err.response.data.error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(userActionTypes.SIGN_UP_START, SignUpStart);
}

export function* CheckUserSession() {
	const { token } = yield select();
	if (token.token) {
		try {
			const auth = yield axios.get(
				'https://medicare-server.herokuapp.com/api/v1/auth/',
				{
					headers: { Authorization: `Bearer ${token.token}` },
				},
			);
			yield put(signInSuccess(auth.data));
		} catch (err) {
			yield put(signInFailure(err.response.data.error));
		}
	}
}

export function* onCheckUserSession() {
	yield takeLatest(userActionTypes.CHECK_USER_SESSION, CheckUserSession);
}

export function* SignOutStart() {
	try {
		yield put(removeToken());
		yield put(signOutSuccess());
	} catch (err) {
		yield put(signOutFailure(err.message));
	}
}

export function* onSignOutStart() {
	yield takeLatest(userActionTypes.SIGN_OUT_START, SignOutStart);
}

export function* userSaga() {
	yield all([
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onCheckUserSession),
		call(onSignOutStart),
	]);
}
