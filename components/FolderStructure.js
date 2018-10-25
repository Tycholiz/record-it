import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { } from 'expo';

export default class FolderStructure extends Component {
	render() {
		return (
			<ScrollView style={styles.container}>
				<Text>FolderStructure</Text>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 4,
		backgroundColor: '#fff',
	},
});
