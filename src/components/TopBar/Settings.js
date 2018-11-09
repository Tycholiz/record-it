import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
	StyleSheet,
	TouchableOpacity,
	Modal,
	Text,
	View,
} from 'react-native';

import { toggleOptions } from '../../actions'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Icon from 'react-native-vector-icons/FontAwesome';
const optionsIcon = (<Icon name="ellipsis-v" size={40} color='black' />)

class Settings extends Component {

	handleOpenSettings = () => {
		const { dispatch } = this.props;
		dispatch(toggleOptions());
	}

	_menu = null;

	setMenuRef = ref => {
		this._menu = ref;
	};

	hideMenu = () => {
		this._menu.hide();
	};

	showMenu = () => {
		this._menu.show();
	};

	render() {
		return (
			<TouchableOpacity style={styles.settingsIcon} onPress={() => this.handleOpenSettings()}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Menu
							ref={this.setMenuRef}
							button={<Text onPress={this.showMenu}>{optionsIcon}</Text>}
						>
							<MenuItem onPress={this.hideMenu}>Import</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Cloud Connection</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Sound Quality</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Encoding</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Close</MenuItem>
						</Menu>
					</View>
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
	modalMask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContainer: {
		flex: 1,
		alignItems: 'center',
		marginHorizontal: 43,
		marginTop: 43,
		marginBottom: 240,
		backgroundColor: 'dimgrey',
		borderRadius: 4,

	},
	closeModalButton: {
		paddingBottom: 10,
	},
	option: {
		backgroundColor: 'darkslategrey'
	},
	closeOption: {
	},
});
