import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
const upOneLevelIcon = (<Icon name="arrow-circle-left" size={40} color='black' />)
const addFolderIcon = (<Icon name="folder-open" size={40} color='black' />)
const folderIcon = (<Icon name="folder" size={40} color='black' />)

import Folder from './Folder';

export default class FolderStructure extends Component {
	renderFolder = () => {
		return (
			<Folder/>
		);
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.innerContainer}>
					<Folder text={'Up One Level'} icon={upOneLevelIcon}/>
					<Folder text={'New Folder'} icon={addFolderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Law of the Jungle'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />
					<Folder text={'Chimera'} icon={folderIcon} />

				</View>
			</ScrollView>
		);
	}
}

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
