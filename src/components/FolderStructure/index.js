import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const upOneLevelIcon = (<Icon name="arrow-circle-left" size={40} color='darkslategrey' />)
const addFolderIcon = (<Icon name="plus" size={40} color='darkslategrey' />)
const folderIcon = (<Icon name="folder" size={40} color='darkslategrey' />)
const fileIcon = (<Icon name="headphones" size={40} color='darkslategrey' />)

import { enterFolder, getInitialUnits, setActiveFile, createFolder } from '../../actions';
import { getChildrenOfFolder } from '../../utils';

import Folder from './Folder';

class FolderStructure extends Component {

	handleUnitPress = (unitId, unitType) => {
		const { dispatch } = this.props;

		if (unitType === 'folder') {
			dispatch(enterFolder(unitId));
		} else if (unitType === 'file') {
			dispatch(setActiveFile(unitId))
		} else {
			console.error("wtf did you just do?")
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

	componentDidMount() {
		const { currentFolder, dispatch } = this.props;
		dispatch(getInitialUnits(currentFolder));
	};

	renderFolders = () => {
		const { currentFolder } = this.props;
		const childrenOfCurrentFolder = getChildrenOfFolder(this.props, currentFolder);

		return Object.keys(childrenOfCurrentFolder).map((obj) => {
			return (
				<Folder
					text={childrenOfCurrentFolder[obj].title}
					icon={childrenOfCurrentFolder[obj].unitType === 'file' ? fileIcon : folderIcon}
					key={childrenOfCurrentFolder[obj].id}
					onPress={() => this.handleUnitPress(childrenOfCurrentFolder[obj].id, childrenOfCurrentFolder[obj].unitType)}
				/>
			)
		})
	}

	render() {
		const { currentFolder } = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Folder text={'Up One Level'} icon={upOneLevelIcon} onPress={() => this.handleGoUpOneLevel(currentFolder)}/>
					<Folder text={'New Folder'} icon={addFolderIcon} onPress={() => this.handleNewFolder()} />
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
	}
});
