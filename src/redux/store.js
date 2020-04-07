import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['token'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
	middleware.push(logger);
}

export const store = createStore(
	persistedReducer,
	applyMiddleware(...middleware),
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
