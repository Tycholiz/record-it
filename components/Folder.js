import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
const upOneLevelIcon = (<Icon name="arrow-circle-left" size={40} color='black' />)

export default class Folder extends Component {
	render() {
		return (
			<View style={styles.container}>
				{/* {upOneLevelIcon} */}
				<Text>Up One Level</Text>
			</View>
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
		margin: 3,
	},
	icon: {
		justifyContent: 'center',

	}
});
