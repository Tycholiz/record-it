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
				<View style={styles.topbarUpper}>
					<ToggleScreenButton />
					<Settings />
				</View>
				<BreadcrumbBar />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// height: 100,
		// justifyContent: 'flex-start',
		// flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: 'hsla(253, 14%, 24%, 1)',
	},
	topbarUpper: {
		flexDirection: 'row',
	}
});
