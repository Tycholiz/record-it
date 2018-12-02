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

import s from '../../styles/FolderStructure/index';

import {
	enterFolder,
	setActiveFile,
	createFolder,
	multipleMode,
	modifySelectedUnit,
	moveUnits,
	deleteUnits,
} from '../../actions';

import { getChildrenOfFolder } from '../../utils';
import { Mode, Modification, UnitType } from '../../constants/enumerables';

import Folder from './Folder';

class FolderStructure extends Component {
	handleUnitPress = (unitId, unitType, mode) => {
		const { dispatch, selectedUnits } = this.props;

		console.log('hey')

		switch(mode) {
			case Mode.Normal:
			case Mode.Action:
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
		if (currentFolder) dispatch(enterFolder(parentId));
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
		this.handleCancelMultipleSelection();
	}

	handleCancelMultipleSelection = () => {
		const { dispatch } = this.props;
		const { Empty } = Modification;

		dispatch(modifySelectedUnit(Empty))
		dispatch(multipleMode(Mode.Normal));
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
					// handleUnitPress={() => this.handleUnitPress(id, unitType, mode)}
					handleUnitPress={() => console.log("whaddup")}
					selected={this.unitSelectedStatus(id)}
				/>
			)
		})
	}

	render() {
		const { currentFolder, mode } = this.props;

		return (
			<View style={s.container}>

				{/* MODE SELECT */}
				{mode === Mode.Select &&
					<View style={s.selectMultipleTopBar}>
						<TouchableOpacity
							style={s.confirmButton}
							onPress={() =>
								this.handleConfirmMultipleSelection()
							}
						>
							<Text>CONFIRM SELECTION</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={s.cancelButton}
							onPress={() =>
								this.handleCancelMultipleSelection()
							}
						>
							<Text>CANCEL</Text>
						</TouchableOpacity>
					</View>
				}

				{/* MODE ACTION */}
				{mode === Mode.Action &&
					<View style={s.selectMultipleTopBar}>

						<TouchableOpacity
							style={s.moveButton}
							onPress={() =>
								this.handleMoveUnits()
							}
						>
							<Text>MOVE TO CURRENT FOLDER</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={s.deleteButton}
							onPress={() =>
								this.handleDeleteUnits()
							}
						>
							<Text>DELETE SELECTION</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={s.cancelButton}
							onPress={() =>
								this.handleCancelMultipleSelection()
							}
						>
							<Text>CANCEL</Text>
						</TouchableOpacity>
					</View>
				}

				{/* NAVIGATION FOLDERS */}
				<View style={s.innerContainer}>
					<View>
						<Folder
							text={'Up One Level'}
							icon={<Image source={require('../../../assets/images/uponelevel.png')} style={{ width: 40, height: 40 }} />}
							style={s.navContainer}
							handleUnitPress={() =>
								this.handleGoUpOneLevel(currentFolder)
							}
						/>
						<Image source={require('../../../assets/images/nav-unit-divider.png')} style={{ width: 100, height: 2.5, alignSelf: 'center', marginBottom: 5 }} />
					</View>
					<View>
						<Folder
							text={'Add New Folder'}
							icon={<Image source={require('../../../assets/images/add-folder.png')} style={{ width: 50, height: 40 }} />}
							style={s.navContainer}
							handleUnitPress={() =>
								this.handleNewFolder()
							}
						/>
						<Image source={require('../../../assets/images/nav-unit-divider.png')} style={{ width: 100, height: 2.5, alignSelf: 'center', marginBottom: 5 }} />
					</View>
				</View>

				{/* USER FOLDERS */}
				<ScrollView style={s.container}>
					<View style={s.innerContainer}>
						{this.renderFolders()}
					</View>
				</ScrollView>
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