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

import { getChildrenOfFolder, getUnitsToDelete, duplicateTitles, getChildrenOfAllParents } from '../../utils';
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

	// TODO: Implement renderFolder
	renderFolder = () => {
		const { currentRelativePath } = this.props;
		this.readDirectory(currentRelativePath).then(units => {
			units.forEach(unit => {
				return (
					<Folder
						text="kyle"
						unitType={UnitType.Folder}
						dateCreated={"jan"}
						icon={
							<Icon name='audio' size={40} color={colors.primaryColor} />
						}
						handleUnitPress={() => this.handleUnitPress(id, unitType, mode)}
						// selected={this.unitSelectedStatus(id)}
						selected={false}
					/>
				)
			})
		})
		// return (
		// 	<Folder
		// 		text="kyle"
		// 		unitType={UnitType.Folder}
		// 		dateCreated={"jan"}
		// 		icon={
		// 			<Icon name='audio' size={40} color={colors.primaryColor} />
		// 		}
		// 		handleUnitPress={() => this.handleUnitPress(id, unitType, mode)}
		// 		// selected={this.unitSelectedStatus(id)}
		// 		selected={false}
		// 	/>

			// <Folder
			// 	text={name}
			// 	unitType={isDirectory() === true ? UnitType.Folder : UnitType.File}
			// 	dateCreated={dateCreated}
			// 	icon={isDirectory() === false ?
			// 		<Icon name='audio' size={40} color={colors.primaryColor} />
			// 		:
			// 		<Icon name='folder' size={40} color={colors.darkgrey} />
			// 	}
			// 	handleUnitPress={() => this.handleUnitPress(id, unitType, mode)}
			// 	// selected={this.unitSelectedStatus(id)}
			// 	selected={false}
			// />
		// )
	}

	// TODO: Implement readDir
	readDirectory = (currentRelativePath) => {

		const pathToRead = `${RNFS.DocumentDirectoryPath}${currentRelativePath}`
		var promise = RNFS.readDir(pathToRead)
			.then(units => {
					// const { name, isDirectory, mtime } = unit;
				return units
			})
			.catch(err => {
				console.log("error!:", err)
			})
			return promise
	}

	// TODO: Implement mkdir
	makeDirectory = () => {
		/* documentDirectoryPath = /data/user/0/com.recordit/files */

		const { currentRelativePath } = this.props;
		const absolutePath = `${RNFS.DocumentDirectoryPath}${currentRelativePath}/New Folder`
		RNFS.mkdir(absolutePath)
			.then(() => {
				console.log("new directory created!")
			})
			.catch(err => {
				console.log(err)
			})
	}

	// renderFolders = () => {
	// 	const { currentFolder, mode } = this.props;
	// 	const childrenOfCurrentFolder = getChildrenOfFolder(this.props, currentFolder);

	// 	return Object.keys(childrenOfCurrentFolder).map((obj) => {
	// 		const { title, unitType, id, dateCreated } = childrenOfCurrentFolder[obj];
	// 		return (
	// 			<Folder
	// 			key={id}
	// 			id={id}
	// 			text={title}
	// 			unitType={unitType}
	// 			dateCreated={dateCreated}
	// 			icon={unitType === UnitType.File ?
	// 				<Icon name='audio' size={40} color={colors.primaryColor} />
	// 				:
	// 				<Icon name='folder' size={40} color={colors.darkgrey} />
	// 			}
	// 			handleUnitPress={() => this.handleUnitPress(id, unitType, mode)}
	// 			selected={this.unitSelectedStatus(id)}
	// 			/>
	// 		)
	// 	})
	// }

		render() {
			const { currentRelativePath, mode } = this.props;
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
						{/* //TODO: IMPLEMENT */}
						{this.renderFolder()}
					</View>
				</ScrollView>

				{/* NAVIGATION BUTTONS */}
				<View style={s.navButtonWrapper}>
					<TouchableOpacity style={s.navButton}
						// onPress={() =>
						// 	this.handleGoUpOneLevel(currentFolder)
						// }
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