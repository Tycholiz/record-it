import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

import Icon from 'react-native-vector-icons/FontAwesome';
const optionsIcon = (<Icon name="ellipsis-v" size={40} color='black' />)

export default class Settings extends Component {

	handleOpenSettings = () => {
		console.log("hey!")
	}

	render() {
		return (
			<TouchableOpacity style={styles.settingsIcon} onPress={() => handleOpenSettings()}>
				{optionsIcon}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	settingsIcon: {
		flex: 1,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
