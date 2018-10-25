import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
const optionsIcon = (<Icon name="ellipsis-v" size={40} color='black' />)

export default class Settings extends Component {
	render() {
		return (
			<View style={styles.settingsIcon}>
				{optionsIcon}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	settingsIcon: {
		// width: '20%',
		flex: 1,
		backgroundColor: 'blue',
		height: 60,
	},
});
