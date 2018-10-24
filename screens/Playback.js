import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import PlaybackControl from '../components/PlaybackControl';

export default class Playback extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Playback</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
