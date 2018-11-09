import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Icon from 'react-native-vector-icons/FontAwesome';
const barsIcon = (<Icon name="bars" size={30} color='black' />)

export default class Folder extends Component {
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
		const { text, icon, onPress, unitType } = this.props;
		return (
			<TouchableOpacity style={styles.container} onPress={onPress}>

				{unitType &&
					<TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={this.showMenu}>
						<Menu
							ref={this.setMenuRef}
							button={barsIcon}
						>
							<MenuItem onPress={this.hideMenu}>Rename</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Delete</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Favorite</MenuItem>
							{unitType === 'file' &&
								<View>
									<MenuDivider />
									<MenuItem onPress={this.hideMenu}>Share</MenuItem>
								</View>
							}
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Close</MenuItem>
						</Menu>
					</TouchableOpacity>
				}

				{icon}
				<Text icon={icon}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 80,
		borderRadius: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-end',
		margin: 6,
	},
	icon: {
		justifyContent: 'center',
	},
	barsIcon: {
		alignSelf: 'flex-end',
		marginRight: 20,
		marginTop: 80,
	},
});
