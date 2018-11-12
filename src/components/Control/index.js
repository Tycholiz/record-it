import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from 'react-navigation';

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import RecordControl from './RecordControl';
import PlaybackControl from './PlaybackControl';

class Control extends Component {

	render() {
		const { controlView, selectMultipleMode } = this.props;
		return (
			<View style={styles.container}>
				{controlView === 'record' ?
					<RecordControl />
						:
					<PlaybackControl />
				}
			</View>
		);
	}
}

// If mapStateToProps is specified, the new component will subscribe to Redux store updates.This means that any time the store is updated, mapStateToProps will be called

//The mapStateToProps function's first argument is the entire Redux store’s state and it returns an object to be passed as props.
mapStateToProps = (state) => {
	return {
		controlView: state.toggle.controlView,
		selectMultipleMode: state.multiple.selectMultiple,
	}
}

// const ControlWithNav = createBottomTabNavigator({
// 	Home: HomeScreen,
// 	Settings: SettingsScreen,
// });

export default connect(mapStateToProps)(Control);

const styles = StyleSheet.create({
	container: {
		height: 160,
	},
});
