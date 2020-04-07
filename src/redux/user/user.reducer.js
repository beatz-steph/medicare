import { userActionTypes } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	error: null,
	isFetching: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userActionTypes.EMAIL_SIGN_START:
		case userActionTypes.CHECK_USER_SESSION:
			return {
				...state,
				isFetching: true,
			};

		case userActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				isFetching: false,
				error: null,
			};

		case userActionTypes.SIGN_IN_FAILURE:
			return {
				...state,
				error: { ...state.error, signIn: action.payload },
				isFetching: false,
			};
		case userActionTypes.SIGN_OUT_FAILURE:
			return {
				...state,
				error: { ...state.error, signOut: action.payload },
				isFetching: false,
			};
		case userActionTypes.SIGN_UP_FAILURE:
			return {
				...state,
				error: { ...state.error, signUp: action.payload },
				isFetching: false,
			};
		case userActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				error: null,
				isFetching: false,
			};
		default:
			return state;
	}
};

export default userReducer;
