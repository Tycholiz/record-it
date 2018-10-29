import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
const starIcon = (<Icon name="star" size={30} color='gold' />)
const trashIcon = (<Icon name="trash" size={30} color='darkslategrey' />)
const backwardIcon = (<Icon name="fast-backward" size={30} color='darkslategrey' />)
const forwardIcon = (<Icon name="fast-forward" size={30} color='darkslategrey' />)
const playIcon = (<Icon name="play" size={40} color='darkslategrey' />)

export default class PlaybackControl extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					{trashIcon}
					{starIcon}
				</View>
				<Text style={styles.text}>chimeraSolo.mp3</Text>
				<View style={styles.clipScroll}>
					<Text style={styles.time}>
						00:10
					</Text>
					<Text style={[styles.time, styles.scroller]}>
						-----------O-----------------------------------
					</Text>
					<Text style={styles.time}>
						00:34
					</Text>
				</View>
				<View style={styles.clipNavigation}>
					{backwardIcon}
					{playIcon}
					{forwardIcon}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: 'darkslategrey',
	},
	namePlate: {
		flexDirection: 'row',
	},
	text: {
		marginLeft: 15,
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	clipScroll: {
		flexDirection: 'row',
		// flexWrap: 'wrap',
	},
	time: {
		borderRadius: 1,
		borderWidth: 0.5,
		margin: 15,
		padding: 3,
	},
	scroller: {
		borderWidth: 0,
	},
	clipNavigation: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});
