import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
	StyleSheet,
	TouchableOpacity,
	Modal,
	Text,
	View,
	TouchableHighlight
} from 'react-native';

import { toggleOptions } from '../../actions'

import Icon from 'react-native-vector-icons/FontAwesome';
const optionsIcon = (<Icon name="ellipsis-v" size={40} color='black' />)

class Settings extends Component {

	handleOpenSettings = () => {
		const { dispatch, optionsOpen } = this.props;
		dispatch(toggleOptions());

		//below in render() section, render conditionally the modal if settingsOpen = true
		console.log("hey mama")
	}

	render() {
		const { optionsOpen } = this.props;
		return (
			<TouchableOpacity style={styles.settingsIcon} onPress={() => this.handleOpenSettings()}>
				{optionsIcon}

				<Modal
					animationType="fade"
					transparent={false}
					visible={optionsOpen}
					onRequestClose={() => { () => this.handleOpenSettings()}}>
					<View style={styles.modal}>
						<View style={styles.container}>
							<Text>Hello World!</Text>

							<TouchableHighlight onPress={() => this.handleOpenSettings()}>
								<Text>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>

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
	modal: {
		// marginTop: 22,
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',

	},
	container: {
		flex: 1,
		margin: 22,
		backgroundColor: 'white',
	},
	closeModalButton: {
		paddingBottom: 10,
	},
});
