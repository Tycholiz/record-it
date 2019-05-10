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
import Icon from '../../styles/Icon';

import Modal from "react-native-modal";

import s from '../../styles/FolderStructure/index';
import colors from '../../styles/colors';

import uuid from 'uuid/v4'

import RNFS from 'react-native-fs'

import {
	enterFolder,
	setActiveFile,
	createFolder,
	multipleMode,
	modifySelectedUnit,
	moveUnits,
	deleteUnits,
} from '../../actions';

import { getChildrenOfFolder, getUnitsToDelete, duplicateTitles, getChildrenOfAllParents, popCurrentDirectoryOffPath, addNewDirOnPath } from '../../utils';
import { Mode, Modification, UnitType } from '../../constants/enumerables';

import Folder from './Folder';

class FolderStructure extends Component {
	state = {
		deleteConfirmation: false,
		units: []
	}

	componentDidMount() {
		this.updateUnitsState()
	}

	updateUnitsState() {
		const { currentRelativePath } = this.props;
		this.readDirectory(currentRelativePath).then(units => {
			console.log('units', units)
			this.setState({
				units
			})
		})
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

	handleGoUpOneLevel = async (currentRelativePath) => {
		const { dispatch } = this.props;

		const newCurrentPath = popCurrentDirectoryOffPath(currentRelativePath)
		await dispatch(enterFolder(newCurrentPath)); //need to call this function and the one below it synchronously
		this.updateUnitsState();
	}

	handleUnitPress =  async (unitName, isDirectory, mode) => {
		const { dispatch, selectedUnits, currentRelativePath } = this.props;

		switch(mode) {
			case Mode.Normal:
			case Mode.Action:
			case Mode.ActionSingle:
				// if (selectedUnits.indexOf(unitId) !== -1 && Mode.Action) {
				// 	Alert.alert('Cannot enter a selected folder');
				// 	return;
				// }
				if (isDirectory) {

					await dispatch(enterFolder(addNewDirOnPath(currentRelativePath, unitName))) //need to call this function and the one below it synchronously
					this.updateUnitsState()
				} else if (!isDirectory) {
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

	readDirectory = (currentRelativePath) => {
		const pathToRead = `${RNFS.DocumentDirectoryPath}${currentRelativePath}`
		console.log('currentRelativePath', currentRelativePath)

		var promise = RNFS.readDir(pathToRead)
			.then(units => {
				units.forEach(unit => {
					unit.id = uuid() //note: this will produce a new id each time the units are rendered on the screen. will this cause issues?
				})
				return units
			})
			.catch(err => {
				console.log("error!:", err)
			})
		return promise
	}

	makeDirectory = () => {
		/* documentDirectoryPath = /data/user/0/com.recordit/files */
		const { currentRelativePath } = this.props;
		const absolutePath = `${RNFS.DocumentDirectoryPath}${currentRelativePath}/Test Folder(6)`
		RNFS.mkdir(absolutePath)
		.then(() => {
			console.log("new directory created!")
		})
		.catch(err => {
			console.log(err)
		})
		this.updateUnitsState()
	}

	render() {
		const { mode, currentRelativePath } = this.props;
		const { deleteConfirmation, units } = this.state;

		folders = units.map(unit => {
			return (
				<Folder
					text={unit.name}
					key={unit.id}
					unitType={UnitType.Folder}
					unitType={unit.isDirectory() ? UnitType.Folder : UnitType.File}
					icon={ unit.isDirectory() ?
						<Icon name='folder' size={40} color={colors.darkgrey} />
							:
						<Icon name='audio' size={40} color={colors.primaryColor} />
					}
					handleUnitPress={() => this.handleUnitPress(unit.name, unit.isDirectory(), mode)}
					selected={false}
				/>
				)
			});

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
						{folders}
					</View>
				</ScrollView>

				{/* NAVIGATION BUTTONS */}
				<View style={s.navButtonWrapper}>
					<TouchableOpacity style={s.navButton}
						onPress={() =>
							this.handleGoUpOneLevel(currentRelativePath)
						}
					>
						<Text style={[s.navButtonText, s.upOneLevel]}>UP ONE LEVEL</Text>
						<Icon name='up-one-level' color={colors.white} size={15}></Icon>
					</TouchableOpacity>

					<TouchableOpacity style={s.navButton}
						onPress={() =>
							// this.handleNewFolder()
							this.makeDirectory()
						}
					>
						<Icon name='add-folder' color={color = colors.white} size={15}></Icon>
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
									{/* <View>
										{this.listUnitsToDelete(UnitType.Folder)}
									</View> */}
								</View>
								<View>
									<Text style={s.unitTypeTitle}>Files</Text>
									{/* <View>
										{this.listUnitsToDelete(UnitType.File)}
									</View> */}
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
		currentRelativePath: state.currentRelativePath,
		units: state.units,
		mode: state.multiple.mode,
		selectedUnits: state.multiple.selectedUnits
	};
}

export default connect(mapStateToProps)(FolderStructure);