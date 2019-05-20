import React, { Component } from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	Image,
} from 'react-native'
import T from 'prop-types'
import s from '../../styles/FolderStructure/Folder'

import { UnitType } from '../../constants/enumerables';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class MenuOptions extends Component {
	render() {
		const { unitType, handleOpenModal, showMenu, setMenuRef, hideMenu } = this.props;

		return (
			<TouchableOpacity
				style={s.folderOptionsContainer}
				onPress={showMenu}
			>
				<Menu
					ref={setMenuRef}
					button={<Image source={require('../../../assets/images/settings.png')} style={{ height: 0, width: 0 }} />}
				>
					<MenuItem onPress={() => handleMoveUnit(id)}>Move</MenuItem>
					<MenuDivider />
					<MenuItem onPress={() => handleOpenModal('renameModal')}>Rename</MenuItem>
					<MenuDivider />
					<MenuItem onPress={() => handleOpenModal('deleteModal')}>Delete</MenuItem>
					<MenuDivider />
					<MenuItem onPress={hideMenu}>Favorite</MenuItem>
					{unitType === UnitType.File &&
						<View>
							<MenuDivider />
							<MenuItem onPress={hideMenu}>Share</MenuItem>
						</View>
					}
					<MenuDivider />
					<MenuItem onPress={() => handleOpenModal('moreInfoModal')}>More info...</MenuItem>
					<MenuDivider />
					<MenuItem onPress={hideMenu}>Close</MenuItem>
				</Menu>
			</TouchableOpacity>
		)
	}
}

MenuOptions.propTypes = {
	unitType: T.string.isRequired,
	handleOpenModal: T.func
}

export default MenuOptions
