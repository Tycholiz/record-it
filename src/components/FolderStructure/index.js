import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const upOneLevelIcon = (<Icon name="arrow-circle-left" size={40} color='darkslategrey' />)
const addFolderIcon = (<Icon name="folder-open" size={40} color='darkslategrey' />)
const folderIcon = (<Icon name="folder" size={40} color='darkslategrey' />)
const fileIcon = (<Icon name="file" size={40} color='darkslategrey' />)

import { enterFolder } from '../../actions';
import { getChildrenOfFolder } from '../../utils';

import Folder from './Folder';

class FolderStructure extends Component {

	sayHi = (name) => {
		console.log("hey", name)
	}

	componentDidMount() {
		const { currentFolder, dispatch } = this.props;
		dispatch(enterFolder(currentFolder));
	};

	renderFolders = () => {
		const { currentFolder, dispatch } = this.props;
		const childrenOfCurrentFolder = getChildrenOfFolder(this.props, currentFolder);

		return Object.keys(childrenOfCurrentFolder).map((obj) => {
			return (
				<Folder
					text={childrenOfCurrentFolder[obj].title}
					icon={childrenOfCurrentFolder[obj].unitType === 'file' ? fileIcon : folderIcon}
					key={childrenOfCurrentFolder[obj].id}
					// handleEnterFolder={enterFolder(childrenOfCurrentFolder[obj].id)}
					onPress={() => this.sayHi(childrenOfCurrentFolder[obj].id)}
				/>
			)
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Folder text={'Up One Level'} icon={upOneLevelIcon}/>
					<Folder text={'New Folder'} icon={addFolderIcon} />
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
