import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import { tokenReducer } from './token/token.functions';
// import workersReducer from './workers/workers.reducer';

export default combineReducers({
	token: tokenReducer,
	user: userReducer,
});
