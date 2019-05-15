import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Image,
	Dimensions,
	Alert,
} from 'react-native';
import T from 'prop-types'
import s from '../../styles/FolderStructure/Folder'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
// import Modal from "react-native-modal";
import Modal from '../utility/Modal'
import RNFS from 'react-native-fs';
import RadialGradient from 'react-native-radial-gradient';

import { showShortDirPath } from '../../utils';

import { Mode, ControlView, UnitType, Modification } from '../../constants/enumerables';
import { BASE_URL } from '../../constants/constants'

import { multipleMode, modifySelectedUnit } from '../../actions';

class Folder extends Component {
	state = {
		_menu: null,
		renameModal: false,
		deleteModal: false,
		moreInfoModal: false,
		title: this.props.unitName,
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

	handleOpenModal = (modal) => {
		this.hideMenu()
		this.setState(() => {
			return {
				[modal]: true
			};
		});
	};

	handleCloseModal = (modal) => {
		this.setState(() => {
			return {
				[modal]: false
			};
		});
	}

	handleDeleteUnit = async () => {
		const { currentRelativePath, updateUnitsState, unitName } = this.props;
		const unitToDelete = `${BASE_URL}${currentRelativePath}/${unitName}`

		await RNFS.unlink(unitToDelete)
			.then(() => {
				console.log('FILE DELETED');
			})
			.catch((err) => {
				console.log(err.message);
			});
		updateUnitsState()
	}

	handleRenameUnit = async () => {
		const { currentRelativePath, unitName, updateUnitsState } = this.props;

		const unitToBeRenamed = `${BASE_URL}${currentRelativePath}/${unitName}`
		const newName = `${BASE_URL}${currentRelativePath}/${this.state.title}`
		await RNFS.moveFile(unitToBeRenamed, newName)
			.then(() => {
				console.log('unit renamed!')
				this.setState({
					renameModal: false
				})
			})
			.catch(err => {
				console.log("error!", err);
			})
		updateUnitsState()
	}

	getNumChildren = () => {
		return 23;
	}

	render() {
		const { renameModal, deleteModal, moreInfoModal } = this.state;
		const {
			unitName,
			icon,
			handleUnitPress,
			currentRelativePath,
			unitType,
			selected,
			mode,
			dateCreated,
			size
		} = this.props;

		return (
			<View>

				{/* USER FOLDER */}
				<TouchableOpacity onPress={handleUnitPress} onLongPress={this.showMenu}>
					<View
						style={{ overflow: 'hidden', borderRadius: 4 }}
					>
						<RadialGradient
							style={[
								s.container, //styles applied to all units
								unitType === undefined && s.navContainer,
								unitType === UnitType.File && s.fileContainer,
								unitType === UnitType.Folder && s.folderContainer,
								mode === Mode.Select && unitType ? s.containerMultipleMode : null,
								selected && s.containerSelected
							]}
							colors={[
								'hsla(0, 0%, 80%, 1)',
								'hsla(0, 0%, 15%, 1)',
							]}
							radius={250}
						>
							{icon}
							<Text style={s.unitTitleText}>
								{unitName}
							</Text>
						</RadialGradient>
					</View>
				</TouchableOpacity>

				{/*  FOLDER OPTIONS **temporary** */}
				{unitType &&
					<TouchableOpacity
						style={s.folderOptionsContainer}
						onPress={this.showMenu}
					>
						<Menu
							ref={this.setMenuRef}
							button={<Image source={require('../../../assets/images/settings.png')} style={{ height: 0, width: 0 }} />}
						>
							<MenuItem onPress={() => this.handleMoveUnit(id)}>Move</MenuItem>
							<MenuDivider />
							<MenuItem onPress={() => this.handleOpenModal('renameModal')}>Rename</MenuItem>
							<MenuDivider />
							<MenuItem onPress={() => this.handleOpenModal('deleteModal')}>Delete</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Favorite</MenuItem>
							{unitType === UnitType.File &&
								<View>
									<MenuDivider />
									<MenuItem onPress={this.hideMenu}>Share</MenuItem>
								</View>
							}
							<MenuDivider />
							<MenuItem onPress={() => this.handleOpenModal('moreInfoModal')}>More info...</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Close</MenuItem>
						</Menu>
					</TouchableOpacity>
				}

				<Modal
					isVisible={this.state.renameModal}
					modalType="renameModal"
					unitName={unitName}
					heading={`rename ${unitType === UnitType.File ? "File" : "Folder"}`}
					closeText="Cancel"
					hasAcceptButton={true}
					acceptText="Confirm"
					unitType={unitType}
					acceptMethod={this.handleRenameUnit}
					handleCloseModal={this.handleCloseModal}
				/>
				<Modal
					isVisible={this.state.deleteModal}
					modalType="deleteModal"
					heading={`Are you sure you want to delete ${unitName}?`}
					closeText="Cancel"
					hasAcceptButton={true}
					acceptText="Confirm"
					unitType={unitType}
					acceptMethod={this.handleDeleteUnit}
					handleCloseModal={this.handleCloseModal}
				/>
				<Modal
					isVisible={this.state.moreInfoModal}
					modalType="moreInfoModal"
					heading={unitName}
					closeText="Close"
					hasAcceptButton={false}
					unitType={unitType}
					size={size}
					handleCloseModal={this.handleCloseModal}
					dateCreated={dateCreated}
					numChildren={this.getNumChildren()}
					fullPath={`${showShortDirPath(currentRelativePath)}/${unitName}`}
				/>
			</View>
		);
	}
}


Folder.propTypes = {
	unitName: T.string.isRequired,
	icon: T.object.isRequired,
	handleUnitPress: T.func.isRequired,
	currentRelativePath: T.string.isRequired,
	unitType: T.string.isRequired,
	selected: T.bool.isRequired,
	mode: T.string.isRequired,
	dateCreated: T.instanceOf(Date),
	size: T.number
}

const mapStateToProps = state => {
	return {
		currentRelativePath: state.currentRelativePath,
		units: state.units,
		mode: state.multiple.mode
	};
}

export default connect(mapStateToProps)(Folder);