import { createSelector } from 'reselect';

//action types
export const tokenAcionTypes = {
	SET_TOKEN: 'SET_TOKEN',
	REMOVE_TOKEN: 'REMOVE_TOKEN',
};

//actions
export const setToken = token => ({
	type: tokenAcionTypes.SET_TOKEN,
	payload: token,
});
export const removeToken = () => ({
	type: tokenAcionTypes.REMOVE_TOKEN,
});

//reducers
const INITIAL_STATE = {
	token: null,
};

export const tokenReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case tokenAcionTypes.SET_TOKEN:
			return {
				token: action.payload,
			};
		case tokenAcionTypes.REMOVE_TOKEN:
			return {
				token: null,
			};
		default:
			return state;
	}
};

//token selector
const tokenSelector = state => state.token;

export const selectToken = createSelector(tokenSelector, token => token.token);
