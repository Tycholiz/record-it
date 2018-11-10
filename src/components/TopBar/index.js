import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import ToggleControlButton from './ToggleControlButton';
import Settings from './Settings';
import BreadcrumbBar from './BreadcrumbBar';

export default class TopBar extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.topbarUpper}>
					<ToggleControlButton />
					<Settings />
				</View>
				<BreadcrumbBar />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexWrap: 'wrap',
		backgroundColor: 'hsla(253, 14%, 24%, 1)',
	},
	topbarUpper: {
		flexDirection: 'row',
	}
});
