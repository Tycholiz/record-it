import {
	createStore,
	applyMiddleware,
	compose,
} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducer from "../reducers/index";

let store = null;

if (__DEV__) {
	const devToolsEnhancer = require('remote-redux-devtools');
	store = createStore(
		reducer,
		{},
		applyMiddleware(thunk)
		// compose(
		// 	applyMiddleware(thunk),
		// 	devToolsEnhancer.default({ //was getting a socketerror in the console with this code. need to figure out to use remote redux devtools
		// 		realtime: true,
		// 		hostname: 'localhost',
		// 		port: 19002,
		// 		suppressConnectErrors: false,
		// 	}),
		// ),
	);
} else {
	store = createStore(
		reducer,
		{},
		applyMiddleware(thunk),
	);
}

export default store;