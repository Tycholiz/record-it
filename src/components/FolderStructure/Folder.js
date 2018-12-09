import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	TextInput,
	Image,
	Alert,
	KeyboardAvoidingView,
	Dimensions
} from 'react-native';
import s from '../../styles/FolderStructure/Folder'

const screen = Dimensions.get('window');
import { timeConverter, displayBreadCrumb } from '../../utils';

import { Mode, ControlView, UnitType, Modification } from '../../constants/enumerables';

import { deleteUnit, renameUnit, multipleMode, modifySelectedUnit } from '../../actions';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Modal from "react-native-modal";

class Folder extends Component {
	state = {
		_menu: null,
		renaming: false,
		deleteConfirmation: false,
		moreInfo: false,
		title: this.props.text,
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

	handleDelete = (unitId, unitType) => {
		const { dispatch } = this.props;

		dispatch(deleteUnit(unitId, unitType));
		this.handleCloseModal('deleteConfirmation');
	};

	handleRename = (unitId, unitType) => {
		const { dispatch } = this.props;
		const { title } = this.state;

		this.handleCloseModal('renaming');
		title ? dispatch(renameUnit(unitId, unitType, title)) : null
	}

	handleMoveUnit = (unitId) => {
		const { dispatch } = this.props;
		const { Add } = Modification;

		this.hideMenu();
		dispatch(multipleMode(Mode.ActionSingle));
		dispatch(modifySelectedUnit(Add, unitId))
	}

	getNumChildren = (id) => {
		return 23;
	}

	render() {
		const { renaming, deleteConfirmation, moreInfo } = this.state;
		const { id, text, icon, dateCreated, handleUnitPress, unitType, selected, mode } = this.props;


		return (
			<View>

				{/* USER FOLDER */}
				<TouchableOpacity onPress={handleUnitPress}>
					<View
						style={[
							s.container, //styles applied to all units
							unitType === undefined && s.navContainer,
							unitType === UnitType.File && s.fileContainer,
							unitType === UnitType.Folder && s.folderContainer,
							mode === Mode.Select && unitType ? s.containerMultipleMode : null,
							selected && s.containerSelected
						]}
					>
						{icon}
						<Text style={{textAlign: 'center'}}>
							{text}
						</Text>
					</View>
				</TouchableOpacity>

				{/* FOLDER OPTIONS **temporary** */}
				{unitType &&
					<TouchableOpacity
						style={s.folderOptionsContainer}
						onPress={this.showMenu}
					>
						<Menu
							ref={this.setMenuRef}
							button={<Image source={require('../../../assets/images/settings.png')} style={ { height: 14, width: 14 } } />}
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
									this.handleRename(id, unitType)}
								}
							>
								<Text style={[s.modalOption, s.confirmOption]}>RENAME</Text>
							</TouchableOpacity>
						</View>

					</View>
				</Modal>

				{/* DELETE CONFIRMATION MODAL */}
				<Modal
					onBackdropPress={() => this.setState({ deleteConfirmation: false })}
					isVisible={deleteConfirmation}
					style={s.modalContainer}
					avoidKeyboard={true}
				>
					<View style={s.modalContainerInner}>
						{unitType === UnitType.File ?
							<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this clip?</Text>
							:
							<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this folder?</Text>
						}
						<Text style={s.breadCrumb}>{text}</Text>
						<View style={s.modalOptions}>
							<TouchableOpacity
								onPress={() => {
									this.handleCloseModal('deleteConfirmation');
								}}
							>
								<Text style={[s.modalOption, s.cancelOption]}>CANCEL</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.handleDelete(id, unitType)
								}}
							>
								<Text style={[s.modalOption, s.confirmOption]}>CONFIRM</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				{/* MORE INFO MODAL */}
				<Modal
					onBackdropPress={() => this.setState({ moreInfo: false })}
					isVisible={moreInfo}
					style={s.modalContainer}
					avoidKeyboard={true}
				>
					<View style={[s.modalContainerInner, s.detailsModalContainerInner]}>
						<Text style={s.modalHeader}>{text}</Text>
						<View style={s.details}>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Full Path</Text>
								<Text style={s.lineInfo}>{displayBreadCrumb(this.props, false)} > {text}</Text>
							</View>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Date Created</Text>
								{/* <Text style={s.lineInfo}>October 22, 2018</Text> */}
								<Text style={s.lineInfo}>{timeConverter(dateCreated)}</Text>
							</View>
							{unitType === UnitType.Folder &&
								<View style={s.lineItem}>
									<Text style={s.lineTitle}>Number of Children</Text>
									<Text style={s.lineInfo}>{this.getNumChildren(id)}</Text>
								</View>
							}
							{unitType === UnitType.File &&
								<View>
									<View style={s.lineItem}>
										<Text style={s.lineTitle}>Duration</Text>
										<Text style={s.lineInfo}>1:22</Text>
									</View>
									<View style={s.lineItem}>
										<Text style={s.lineTitle}>File Type</Text>
										<Text style={s.lineInfo}>{unitType}</Text>
									</View>
								</View>
							}
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Size</Text>
								<Text style={s.lineInfo}>2.43mb</Text>
							</View>

						</View>
						<View style={s.modalOptions}>
							<TouchableOpacity
								onPress={() => {
									this.handleCloseModal('moreInfo');
								}}
								style={s.modalOptions}
							>
								<Text style={[s.modalOption, s.cancelOption]}>CLOSE</Text>
							</TouchableOpacity>
						</View>

					</View>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentFolder: state.currentFolder,
		units: state.units,
		mode: state.multiple.mode
	};
}

export default connect(mapStateToProps)(Folder);