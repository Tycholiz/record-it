import {
	createStore,
	applyMiddleware,
	compose,
} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import devToolsEnhancer from 'remote-redux-devtools';

import reducer from "../reducers/index";

let store = null;

if (__DEV__) {
	store = createStore(
		reducer,
		compose(
			applyMiddleware(thunk),
			devToolsEnhancer())
	);
} else {
	store = createStore(
		reducer,
		{},
		applyMiddleware(thunk),
	);
}

export default store;