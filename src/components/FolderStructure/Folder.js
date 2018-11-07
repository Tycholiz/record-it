import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { } from 'expo';

export default class Folder extends Component {
	render() {
		const { text, icon, childrenCount } = this.props;
		return (
			<TouchableOpacity style={styles.container}>
				{icon}
				<Text icon={icon}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 80,
		borderRadius: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-end',
		margin: 6,
	},
	icon: {
		justifyContent: 'center',
	},
});
