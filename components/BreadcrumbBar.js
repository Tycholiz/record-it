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
const searchIcon = (<Icon name="search" size={30} color='black' />)

export default class BreadcrumbBar extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Home > WiP > Middle East Song</Text>
				<TouchableOpacity style={styles.searchIcon}>
					{searchIcon}
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 0.5,
		backgroundColor: 'white',
		height: 40,
		alignItems: 'center',
		flexDirection: 'row',
	},
	text: {
		flex: 1,
		marginLeft: 10,
	},
	searchIcon: {
		marginRight: 10,
	}
});
