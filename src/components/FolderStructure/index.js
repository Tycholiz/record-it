import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';
import Modal from "react-native-modal";

import s from '../../styles/FolderStructure/index';
import colors from '../../styles/colors';

import {
	enterFolder,
	setActiveFile,
	createFolder,
	multipleMode,
	modifySelectedUnit,
	moveUnits,
	deleteUnits,
} from '../../actions';

import { getChildrenOfFolder, getUnitsToDelete } from '../../utils';
import { Mode, Modification, UnitType } from '../../constants/enumerables';

import Folder from './Folder';

class FolderStructure extends Component {
	state = {
		deleteConfirmation: false,
	}

	handleOpenModal = () => {
		this.setState(() => {
			return {
				deleteConfirmation: true
			};
		});
	};

	handleCloseModal = () => {
		this.setState(() => {
			return {
				deleteConfirmation: false
			};
		});
	}

	handleUnitPress = (unitId, unitType, mode) => {
		const { dispatch, selectedUnits } = this.props;

		switch(mode) {
			case Mode.Normal:
			case Mode.Action:
			case Mode.ActionSingle:
				if (selectedUnits.indexOf(unitId) !== -1 && Mode.Action) {
					Alert.alert('Cannot enter a selected folder');
					return;
				}
				if (unitType === UnitType.Folder) {
						dispatch(enterFolder(unitId));
					} else if (unitType === UnitType.File) {
						dispatch(setActiveFile(unitId))
					} else {
						return;
					}
				break;

			case Mode.Select:
				const { Add, Remove } = Modification;

				if (selectedUnits.indexOf(unitId) === -1) {
					dispatch(modifySelectedUnit(Add, unitId))
				} else {
					dispatch(modifySelectedUnit(Remove, unitId))
				}
				break;
			default:
				return;
		}
	}

	handleGoUpOneLevel = (folderId) => {
		const { dispatch, units, currentFolder } = this.props;

		const parentId = units.folders[folderId].parentId
		if (parseInt(currentFolder)) dispatch(enterFolder(parentId));
	}

	handleNewFolder = () => {
		const { currentFolder, dispatch } = this.props;

		dispatch(createFolder(currentFolder));
	}

	unitSelectedStatus = (unitId) => {
		const { selectedUnits } = this.props;

		if (selectedUnits.indexOf(unitId) !== -1) {
			return true;
		}
		return false;
	}

	handleConfirmMultipleSelection = () => {
		const { dispatch, selectedUnits } = this.props;

		if (selectedUnits.length > 0) {
			dispatch(multipleMode(Mode.Action));
		} else {
			this.handleCancelMultipleSelection();
		}
	}

	handleMoveUnits = () => {
		const { dispatch, selectedUnits, currentFolder } = this.props;

		dispatch(moveUnits(selectedUnits, currentFolder))
		this.handleCancelMultipleSelection();
	}

	handleDeleteUnits = () => {
		const { dispatch, selectedUnits } = this.props;

		dispatch(deleteUnits(selectedUnits))
		this.handleCloseModal();
		this.handleCancelMultipleSelection();
	}

	handleCancelMultipleSelection = () => {
		const { dispatch } = this.props;
		const { Empty } = Modification;

		dispatch(modifySelectedUnit(Empty))
		dispatch(multipleMode(Mode.Normal));
	}

	listUnitsToDelete = (unitType) => {
		const unitsToDelete = getUnitsToDelete(this.props, this.props.selectedUnits, unitType);
		return unitsToDelete.map((obj) => {
			return (
				<Text
					key={obj.id}
					style={s.unitToDelete}
				>
					{obj.title}
				</Text>
			)
		})
	}

	renderFolders = () => {
		const { currentFolder, mode } = this.props;
		const childrenOfCurrentFolder = getChildrenOfFolder(this.props, currentFolder);

		return Object.keys(childrenOfCurrentFolder).map((obj) => {
			const { title, unitType, id } = childrenOfCurrentFolder[obj];
			return (
				<Folder
					key={id}
					id={id}
					text={title}
					unitType={unitType}
					icon={unitType === UnitType.File ?
						<Image source={require('../../../assets/images/audio.png')} style={[s.unitIcon, { height: 53}]} />
							:
						<Image source={require('../../../assets/images/folder.png')} style={s.unitIcon} />
					}
					handleUnitPress={() => this.handleUnitPress(id, unitType, mode)}
					selected={this.unitSelectedStatus(id)}
				/>
			)
		})
	}

	render() {
		const { currentFolder, mode } = this.props;
		const { deleteConfirmation } = this.state;

		return (
			<View style={s.container}>

				{/* MODE SELECT */}
				{mode === Mode.Select &&
					<View style={s.selectMultipleTopBar}>

						<TouchableOpacity
							style={[s.selectMultipleUnitButton, {backgroundColor: colors.secondaryColor, flex: 1.5} ]}
							onPress={() =>
								this.handleConfirmMultipleSelection()
							}
						>
							<Text style={s.selectMultipleText}>CONFIRM</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[s.selectMultipleUnitButton, {backgroundColor: colors.gray} ]}
							onPress={() =>
								this.handleCancelMultipleSelection()
							}
						>
							<Text style={[s.selectMultipleText, { color: '#333333ff' }]}>CANCEL</Text>
						</TouchableOpacity>

					</View>
				}

				{/* MODE ACTION */}
				{mode === Mode.Action || mode === Mode.ActionSingle ? (
					<View style={s.selectMultipleTopBar}>

						<View style={s.containerMultipleButtonRow}>
							{mode === Mode.Action &&
								<TouchableOpacity
									style={[s.selectMultipleUnitButton, { backgroundColor: colors.tertiaryColor }]}
									onPress={() =>
										this.props.dispatch(multipleMode(Mode.Select))
									}
								>
									<Text style={s.selectMultipleText}>SELECT</Text>
								</TouchableOpacity>
							}
							<TouchableOpacity
								style={[s.selectMultipleUnitButton, { backgroundColor: colors.secondaryColor }]}
								onPress={() =>
									this.handleMoveUnits()
								}
							>
								<Text style={s.selectMultipleText}>MOVE HERE</Text>
							</TouchableOpacity>
						</View>

						<View style={s.containerMultipleButtonRow}>
							{mode === Mode.Action &&
								<TouchableOpacity
									style={[s.selectMultipleUnitButton, { backgroundColor: colors.primaryColor }]}
									onPress={() =>
										this.handleOpenModal()
									}
								>
									<Text style={s.selectMultipleText}>DELETE</Text>
								</TouchableOpacity>
							}
							<TouchableOpacity
								style={[s.selectMultipleUnitButton, { backgroundColor: colors.gray }]}
								onPress={() =>
									this.handleCancelMultipleSelection()
								}
							>
								<Text style={[s.selectMultipleText, {color: '#333333ff' }]}>CANCEL</Text>
							</TouchableOpacity>
						</View>

					</View>)
						:
					null
				}

				{/* USER FOLDERS */}
				<ScrollView style={s.container}>
					<View style={s.innerContainer}>
						{this.renderFolders()}
					</View>
				</ScrollView>

				{/* NAVIGATION BUTTONS */}
				<View style={s.navButtonWrapper}>
					<TouchableOpacity style={s.navButton}
						onPress={() =>
							this.handleGoUpOneLevel(currentFolder)
						}
					>
						<Text style={[s.navButtonText, s.upOneLevel]}>UP ONE LEVEL</Text>
						<Image source={require('../../../assets/images/uponelevel.png')} style={{ width: 20, height: 20, marginHorizontal: 5 }} />
					</TouchableOpacity>

					<TouchableOpacity style={s.navButton}
						onPress={() =>
							this.handleNewFolder()
						}
					>
						<Image source={require('../../../assets/images/add-folder.png')} style={{ width: 20, height: 15, marginHorizontal: 5 }} />
						<Text style={[s.navButtonText, s.newFolder]}>NEW FOLDER</Text>
					</TouchableOpacity>
				</View>

				{/* DELETE CONFIRMATION MODAL */}
				<Modal
					onBackdropPress={() => this.setState({ deleteConfirmation: false })}
					isVisible={deleteConfirmation}
					style={s.modalContainer}
					avoidKeyboard={true}
				>
					<View style={s.modalContainerInner}>

						<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete the following?</Text>
						<ScrollView style={s.deleteListContainer}>
							<View style={s.deleteListContainerInner}>
								<View style={s.unitTypeListSection}>
									<Text style={s.unitTypeTitle}>Folders</Text>
									<View>
										{this.listUnitsToDelete(UnitType.Folder)}
									</View>
								</View>
								<View>
									<Text style={s.unitTypeTitle}>Files</Text>
									<View>
										{this.listUnitsToDelete(UnitType.File)}
									</View>
								</View>
							</View>
						</ScrollView>
						<View style={s.modalOptions}>
							<TouchableOpacity
								onPress={() => {
									this.handleCloseModal();
								}}
							>
								<Text style={[s.modalOption, s.cancelOption]}>CANCEL</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.handleDeleteUnits();
								}}
							>
								<Text style={[s.modalOption, s.confirmOption]}>CONFIRM</Text>
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
		mode: state.multiple.mode,
		selectedUnits: state.multiple.selectedUnits
	};
}

export default connect(mapStateToProps)(FolderStructure);