import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
	StyleSheet,
	TouchableOpacity,
	Modal
} from 'react-native';

import { toggleOptions } from '../../actions'


import Icon from 'react-native-vector-icons/FontAwesome';
const optionsIcon = (<Icon name="ellipsis-v" size={40} color='black' />)

class Settings extends Component {

	handleOpenSettings = () => {
		const { dispatch, optionsOpen } = this.props;
		dispatch(toggleOptions());

		//change state to settingsOpen: true
		//below in render() section, render conditionally the modal if settingsOpen = true
		console.log("hey mama")
	}

	render() {
		return (
			<TouchableOpacity style={styles.settingsIcon} onPress={() => this.handleOpenSettings()}>
				{optionsIcon}
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = state => {
	return {
		optionsOpen: state.toggle.optionsOpen,
	};
}

export default connect(mapStateToProps)(Settings);

const styles = StyleSheet.create({
	settingsIcon: {
		flex: 1,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
