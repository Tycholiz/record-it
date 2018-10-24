import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import ToggleScreenButton from './ToggleScreenButton';
import Settings from './Settings';
import BreadcrumbBar from './BreadcrumbBar';

export default class TopBar extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TopBar</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
