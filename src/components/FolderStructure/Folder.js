import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	TextInput,
} from 'react-native';

import { deleteUnit, renameUnit } from '../../actions';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Icon from 'react-native-vector-icons/FontAwesome';
const barsIcon = (<Icon name="bars" size={30} color='black' />)

class Folder extends Component {
	state = {
		_menu: null,
		renaming: false,
	};

	setMenuRef = ref => {
		this.state._menu = ref;
	};

	hideMenu = () => {
		this.state._menu.hide();
	};

	showMenu = () => {
		this.state._menu.show();
	};

	handleDelete = (unitId, unitType) => {
		const { dispatch } = this.props;
		this.hideMenu()
		dispatch(deleteUnit(unitId, unitType));
	};

	handleRenamePrompt = () => {
		this.hideMenu()
		this.setState(() => {
			return {
				renaming: true
			}
		})
	};

	handleRename = (unitId, unitType, newTitle) => {
		const { dispatch } = this.props;
		dispatch(renameUnit(unitId, unitType, newTitle));
		console.log("hey buddy")
	}

	render() {
		const { renaming } = this.state;
		const { text, icon, onPress, unitType, id } = this.props;
		return (
			<TouchableOpacity style={styles.container} onPress={onPress}>

				{unitType &&
					<TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={this.showMenu}>
						<Menu
							ref={this.setMenuRef}
							button={barsIcon}
						>
						<MenuItem onPress={() => this.handleRenamePrompt(id, unitType, text)}>Rename</MenuItem>
							<MenuDivider />
							<MenuItem onPress={() => this.handleDelete(id, unitType)}>Delete</MenuItem>
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
				{renaming ?
					<TextInput
						defaultValue={text}
						onSubmitEditing={(newTitle) => this.handleRename(id, unitType, newTitle)}
					/>
						:
					<Text icon={icon}>
						{text}
					</Text>
				}
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
