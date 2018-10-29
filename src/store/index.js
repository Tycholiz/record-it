import {
	createStore,
	applyMiddleware,
	compose,
} from "redux";
import thunk from 'redux-thunk';

import reducer from "../reducers/index";

let store = null;

if (__DEV__) {
	const devToolsEnhancer = require('remote-redux-devtools');
	store = createStore(
		reducer,
		{},
		compose(
			applyMiddleware(thunk),
			devToolsEnhancer.default({
				realtime: true,
				hostname: 'localhost',
				port: 8000,
				suppressConnectErrors: false,
			}),
		),
	);
} else {
	store = createStore(
		reducer,
		{},
		applyMiddleware(thunk),
	);
}

export default store;