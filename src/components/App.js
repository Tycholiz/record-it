import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	StatusBar
} from 'react-native';

import {
	Constants,
} from 'expo';

import TopBar from './TopBar';
import FolderStructure from './FolderStructure';
import Control from './Control';

export default class filename extends Component {
	render() {
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' &&
					<StatusBar barStyle="default" />
				}
				<TopBar />
				<FolderStructure />
				<Control />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
});
