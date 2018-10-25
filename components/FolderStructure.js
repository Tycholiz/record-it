import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { } from 'expo';

import Folder from './Folder';

export default class FolderStructure extends Component {

	renderFolder = () => {
		return (
			<Folder/>
		);
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<Folder />
				<Folder />
				<Folder />
				<Folder />
				<Folder />
				<Folder />
				<Folder />
				<Folder />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 7,
		flexDirection: 'column',
		flexWrap: 'wrap',
		backgroundColor: 'orange',
	},
});
