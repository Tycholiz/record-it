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
	toggleSelectMultiple,
	confirmMultipleSelection
} from '../../actions';
import { getChildrenOfFolder } from '../../utils';

import Folder from './Folder';

import Icon from 'react-native-vector-icons/FontAwesome';
const upOneLevelIcon = (<Icon name="arrow-circle-left" size={40} color='darkslategrey' />)
const addFolderIcon = (<Icon name="plus" size={40} color='darkslategrey' />)
const folderIcon = (<Icon name="folder" size={40} color='darkslategrey' />)
const fileIcon = (<Icon name="headphones" size={40} color='darkslategrey' />)

class FolderStructure extends Component {
	state = {
		selectedUnits: [],
		promptMultipleSelectAction: false,
	}

	componentDidMount() {
		const { currentFolder, dispatch } = this.props;
		dispatch(getInitialUnits(currentFolder));
	};

	//empty state.selectedUnits if selectMultipleMode is off
	static getDerivedStateFromProps(props, state) {
		if (props.selectMultipleMode === false && state.selectedUnits.length > 0) {
			return {
				selectedUnits: []
			}
		}
		return null;
	}

	handleUnitPress = (unitId, unitType, selectMultipleMode) => {
		const { dispatch } = this.props;

		switch(selectMultipleMode) {
			case true:
				if (this.state.selectedUnits.indexOf(unitId) === -1) {
					this.setState(prevState => ({
						selectedUnits: [...prevState.selectedUnits, unitId]
					}));
				} else {
					const newState = this.state.selectedUnits;
					const index = newState.indexOf(unitId);
					if (index !== -1) newState.splice(index, 1);
					this.setState(() => {
						return {
							selectedUnits: newState
						}
					})
				}
				break;
			case false:
				if (unitType === 'folder') {
						dispatch(enterFolder(unitId));
					} else if (unitType === 'file') {
						dispatch(setActiveFile(unitId))
					} else {
						return;
					}
				break;
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
		if (this.state.selectedUnits.indexOf(id) !== -1) {
			return true;
		}
		return false;
	}

	handleConfirmMultipleSelection = () => {
		const { selectedUnits } = this.state;
		const { dispatch } = this.props;

		dispatch(confirmMultipleSelection(selectedUnits))
		dispatch(toggleSelectMultiple());
		if (selectedUnits.length > 0) this.setState(() => {
			return {
				promptMultipleSelectAction: true
			};
		});
	}

	handleCancelMultipleSelection = () => {
		const { dispatch } = this.props;

		dispatch(toggleSelectMultiple());
	}

	renderFolders = () => {
		const { currentFolder, selectMultipleMode } = this.props;
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
					handleUnitPress={() => this.handleUnitPress(id, unitType, selectMultipleMode)}
					selected={this.unitSelectedStatus(id)}
				/>
			)
		})
	}

	render() {
		const { currentFolder, selectMultipleMode } = this.props;
		const { promptMultipleSelectAction } = this.state;

		return (
			<View style={styles.container}>

				{selectMultipleMode &&
					<View style={styles.selectMultipleTopBar}>

						{!promptMultipleSelectAction ?
							<View>
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
								:
							<View>
								<TouchableOpacity style={styles.confirmButton}>
									<Text>MOVE TO CURRENT FOLDER</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.confirmButton}>
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
		selectMultipleMode: state.multiple.selectMultiple
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
	cancelButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
	},
});
