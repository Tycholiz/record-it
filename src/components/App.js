import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
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

class App extends Component {
	render() {
		const { selectMultipleMode } = this.props;
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' &&
					<StatusBar barStyle="default" />
				}
				<TopBar />
				<FolderStructure />
				{!selectMultipleMode &&
					<Control />
				}
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectMultipleMode: state.multiple.selectMultiple
	};
}

export default connect(mapStateToProps)(App);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
});
