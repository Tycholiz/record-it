import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	TouchableOpacity,
	View,
	Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import s from '../../styles/TopBar/Settings';

import { multipleMode } from '../../actions';
import { Mode } from '../../constants/enumerables';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class Settings extends Component {
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

	handleSelectMultiple = () => {
		const { dispatch } = this.props;

		this.hideMenu();
		dispatch(multipleMode(Mode.Select));
	}

	render() {
		return (
			<TouchableOpacity style={s.settingsIcon} onPress={this.showMenu}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Menu
						ref={this.setMenuRef}
						button={<Image source={require('../../../assets/images/hamburger.png')} style={{ width: 50, height: 40 }} />}
					>
						<MenuItem onPress={this.hideMenu}>Import</MenuItem>
						<MenuDivider />
						<MenuItem onPress={this.handleSelectMultiple}>Select Multiple</MenuItem>
						<MenuDivider />
						<MenuItem onPress={this.hideMenu}>Cloud Connection</MenuItem>
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
		// optionsOpen: state.toggle.optionsOpen,
	};
}

export default connect(mapStateToProps)(Settings);
