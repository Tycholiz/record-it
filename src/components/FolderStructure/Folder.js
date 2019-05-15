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
import Modal from "react-native-modal";
import RNFS from 'react-native-fs';
import RadialGradient from 'react-native-radial-gradient';

import { showShortDirPath } from '../../utils';

import { Mode, ControlView, UnitType, Modification } from '../../constants/enumerables';
import { BASE_URL } from '../../constants/constants'

import { multipleMode, modifySelectedUnit } from '../../actions';

class Folder extends Component {
	state = {
		_menu: null,
		renaming: false,
		deleteConfirmation: false,
		moreInfo: false,
		title: this.props.text,
	};

	handleDeleteUnit = async (name) => {
		const { currentRelativePath, updateUnitsState } = this.props;
		const unitToDelete = `${BASE_URL}${currentRelativePath}/${name}`

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
		const { currentRelativePath, text, updateUnitsState } = this.props;

		const unitToBeRenamed = `${BASE_URL}${currentRelativePath}/${text}`
		const newName = `${BASE_URL}${currentRelativePath}/${this.state.title}`
		await RNFS.moveFile(unitToBeRenamed, newName)
			.then(() => {
				console.log('unit renamed!')
				this.setState({
					renaming: false
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
		const { renaming, deleteConfirmation, moreInfo } = this.state;
		const {
			text,
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
								{text}
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
							<MenuItem onPress={() => this.handleOpenModal('renaming')}>Rename</MenuItem>
							<MenuDivider />
							<MenuItem onPress={() => this.handleOpenModal('deleteConfirmation')}>Delete</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Favorite</MenuItem>
							{unitType === UnitType.File &&
								<View>
									<MenuDivider />
									<MenuItem onPress={this.hideMenu}>Share</MenuItem>
								</View>
							}
							<MenuDivider />
							<MenuItem onPress={() => this.handleOpenModal('moreInfo')}>More info...</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Close</MenuItem>
						</Menu>
					</TouchableOpacity>
				}

				<Modal
					type="renameModal"
					heading={`rename ${unitType === UnitType.File ? "File" : "Folder"}`}
					closeText="Cancel"
					closeMethod={}
					hasAcceptButton={true}
					acceptText="Confirm"
					acceptMethod={this.handleDeleteUnit}
				/>

				{/* RENAME MODAL */}
				<Modal
					onBackdropPress={() => this.setState({ renaming: false })}
					isVisible={renaming}
					style={s.modalContainer}
					avoidKeyboard={true}
				>
					<View style={s.modalContainerInner}>
						{unitType === UnitType.File ?
							<Text style={s.modalHeader}>Rename Clip</Text>
							:
							<Text style={s.modalHeader}>Rename Folder</Text>
						}
						<View style={s.textInputUnderline}>
							<TextInput
								style={s.modalInput}
								onChangeText={(newTitle) =>
									this.setState({
										title: newTitle
									})
								}
								defaultValue={text !== 'New Folder' ? text : ''}
								autoFocus={true}
								selectTextOnFocus={true}
								keyboardAppearance={'dark'}
								maxLength={30}
								underlineColorAndroid='transparent'
							/>
						</View>

						<View style={s.modalOptions}>
							<TouchableOpacity
								onPress={() => {
									this.handleCloseModal('renaming');
								}}
							>
								<Text style={[s.modalOption, s.cancelOption]}>CANCEL</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.handleRenameUnit()
								}}
							>
								<Text style={[s.modalOption, s.confirmOption]}>RENAME</Text>
							</TouchableOpacity>
						</View>

					</View>
				</Modal>

			</View>
		);
	}
}


Folder.propTypes = {
	text: T.string.isRequired,
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