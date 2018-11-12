import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
} from 'react-native';

import {
	enterFolder,
	getInitialUnits,
	setActiveFile,
	createFolder,
	multipleMode,
	modifySelectedUnit,
} from '../../actions';
import { getChildrenOfFolder } from '../../utils';
import { Mode, Modification } from '../../constants/enumerables';

import Folder from './Folder';

import Icon from 'react-native-vector-icons/FontAwesome';
const upOneLevelIcon = (<Icon name="arrow-circle-left" size={40} color='darkslategrey' />)
const addFolderIcon = (<Icon name="plus" size={40} color='darkslategrey' />)
const folderIcon = (<Icon name="folder" size={40} color='darkslategrey' />)
const fileIcon = (<Icon name="headphones" size={40} color='darkslategrey' />)

class FolderStructure extends Component {
	componentDidMount() {
		const { currentFolder, dispatch } = this.props;
		dispatch(getInitialUnits(currentFolder));
	};

	handleUnitPress = (unitId, unitType, mode) => {
		const { dispatch, selectedUnits } = this.props;

		switch(mode) {
			case Mode.Normal:
			case Mode.Action:
				if (unitType === 'folder') {
						dispatch(enterFolder(unitId));
					} else if (unitType === 'file') {
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

	unitSelectedStatus = (id) => {
		const { selectedUnits } = this.props;
		if (selectedUnits.indexOf(id) !== -1) {
			return true;
		}
		return false;
	}

	handleConfirmMultipleSelection = () => {
		const { dispatch, selectedUnits } = this.props;

		if (selectedUnits.length > 0) {
			dispatch(multipleMode(Mode.Action));
		} else {
			dispatch(multipleMode(Mode.Normal));
		}
	}

	handleCancelMultipleSelection = () => {
		const { dispatch } = this.props;

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
					icon={unitType === 'file' ? fileIcon : folderIcon}
					handleUnitPress={() => this.handleUnitPress(id, unitType, mode)}
					selected={this.unitSelectedStatus(id)}
				/>
			)
		})
	}

	render() {
		const { currentFolder, mode } = this.props;

		return (
			<View style={styles.container}>

				{mode === Mode.Select &&
					<View style={styles.selectMultipleTopBar}>
						<TouchableOpacity
							style={styles.confirmButton}
							onPress={() =>
								this.handleConfirmMultipleSelection()
							}
						>
							<Text>CONFIRM SELECTION</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={() =>
								this.handleCancelMultipleSelection()
							}
						>
							<Text>CANCEL</Text>
						</TouchableOpacity>
					</View>
				}

				{mode === Mode.Action &&
					<View style={styles.selectMultipleTopBar}>
						<TouchableOpacity style={styles.moveButton}>
							<Text>MOVE TO CURRENT FOLDER</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.deleteButton}>
							<Text>DELETE SELECTION</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={() =>
								this.handleCancelMultipleSelection()
							}
						>
							<Text>CANCEL</Text>
						</TouchableOpacity>
					</View>
				}

				<View style={styles.innerContainer}>
					<Folder
						text={'Up One Level'}
						icon={upOneLevelIcon}
						handleUnitPress={() =>
							this.handleGoUpOneLevel(currentFolder)
						}
					/>
					<Folder
						text={'Add New Folder'}
						icon={addFolderIcon}
						handleUnitPress={() =>
							this.handleNewFolder()
						}
					/>
				</View>
				<ScrollView style={styles.container}>
					<View style={styles.innerContainer}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		flexGrow: 1,
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
		backgroundColor: 'hsla(253, 14%, 24%, 1)',
	},
	selectMultipleTopBar: {
		position: 'absolute',
		top: -100,
		right: 0,
		bottom: 0,
		left: 0,
		height: 60,
		flexDirection: 'row',
		backgroundColor: 'dimgrey'
	},
	confirmButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'green',
	},
	moveButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
	},
	deleteButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'tomato',
	},
	cancelButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'grey',
	},
});
