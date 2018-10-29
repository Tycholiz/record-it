import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import RecordControl from './RecordControl';
import PlaybackControl from './PlaybackControl';

export default class Control extends Component {
	render() {
		return (
			<View style={styles.container}>
				<RecordControl />
				{/* <PlaybackControl /> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 160,
	},
});
