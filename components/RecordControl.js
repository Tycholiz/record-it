import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
const cancelIcon = (<Icon name="times" size={40} color='white' />)
const microphoneIcon = (<Icon name="microphone" size={50} color='black' />)
const acceptIcon = (<Icon name="check" size={40} color='white' />)

export default class RecordControl extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity>
					{cancelIcon}
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon}>
					{microphoneIcon}
				</TouchableOpacity>
				<TouchableOpacity>
					{acceptIcon}
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'hsla(253, 14%, 26%, 0.8)',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	icon: {
		backgroundColor: 'red',
		width: 80,
		height: 80,
		borderRadius: 80 / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 60,
	},
});
