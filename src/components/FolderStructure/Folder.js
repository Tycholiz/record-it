import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';

import { deleteUnit } from '../../actions';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Icon from 'react-native-vector-icons/FontAwesome';
const barsIcon = (<Icon name="bars" size={30} color='black' />)

class Folder extends Component {
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

	handleDelete = (unitId, unitType) => {
		const { dispatch } = this.props;
		this.hideMenu()
		dispatch(deleteUnit(unitId, unitType));
	};

	render() {
		const { text, icon, onPress, unitType, id } = this.props;
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
							<MenuItem onPress={(e) => this.handleDelete(id, unitType)}>Delete</MenuItem>
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

const mapStateToProps = state => {
	return {
		currentFolder: state.currentFolder,
		units: state.units,
	};
}

export default connect(mapStateToProps)(Folder);

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
