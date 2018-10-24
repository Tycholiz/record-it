import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

export default class BreadcrumbBar extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>BreadcrumbBar</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'yellow',
	},
});
