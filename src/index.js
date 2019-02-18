import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {
    Platform,
    StatusBar, View,
    YellowBox,
} from 'react-native';
// YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { MenuProvider } from 'react-native-popup-menu';

import store from './store'

import App from './components/App';

export default class Root extends Component {
	state = {
		isLoadingComplete: false,
	};

	render() {
			return (
				<Provider store={store}>
					<MenuProvider>
						<App />
					</MenuProvider>
				</Provider>
			);
	}

	_handleLoadingError = error => {
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}

// if (__DEV__) {
// 	console.ignoredYellowBox = ['Remote debugger'];
// }
