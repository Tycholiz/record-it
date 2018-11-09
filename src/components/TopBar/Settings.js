import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Icon from 'react-native-vector-icons/FontAwesome';
const optionsIcon = (<Icon name="ellipsis-v" size={40} color='black' />)

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

	render() {
		return (
			<TouchableOpacity style={styles.settingsIcon} onPress={this.showMenu}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Menu
						ref={this.setMenuRef}
						button={optionsIcon}
					>
						<MenuItem onPress={this.hideMenu}>Import</MenuItem>
						<MenuDivider />
						<MenuItem onPress={this.hideMenu}>Select Multiple</MenuItem>
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
