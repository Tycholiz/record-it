import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { } from 'expo';

export default class ToggleScreenButton extends Component {
	render() {
		return (
			<TouchableOpacity style={styles.container}>
				<View>
					<Text style={styles.buttonText}>
						PLAYBACK
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 4,
		height: 60,
		alignItems: 'center',
		backgroundColor: 'red',
		borderRadius: 7,
	},
	buttonText: {
		fontWeight: '700',
		fontSize: 40,

	}
});
