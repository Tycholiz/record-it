import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	TouchableHighlight
} from 'react-native';

import { displayBreadCrumb } from '../../utils';
import Modal from "react-native-modal";

import Icon from 'react-native-vector-icons/FontAwesome';
const searchIcon = (<Icon name="search" size={30} color='black' />)

class BreadcrumbBar extends Component {
	state = {
		modalOpen: false
	}
	render() {
		const { state } = this.props;
		return (
			<TouchableOpacity style={styles.container} onPress={() => this.setState({ modalOpen: true })}>
				<Text style={styles.text}>{displayBreadCrumb(state)}</Text>
				<View style={styles.searchIcon}>
					{searchIcon}
				</View>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentFolder: state.currentFolder,
		state
	};
}

export default connect(mapStateToProps)(BreadcrumbBar);

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: 40,
		alignItems: 'center',
		flexDirection: 'row',
	},
	text: {
		flex: 1,
		marginLeft: 10,
	},
	searchIcon: {
		marginRight: 10,
	},

	modalMask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	modalContainer: {
		// flex: 1,
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginHorizontal: 43,
		marginTop: 240,
		marginBottom: 240,
		borderRadius: 4,
		backgroundColor: '#2B2B2B',
	},
	modalHeader: {
		flex: 1,
		fontSize: 25
	},
	modalInput: {
		flex: 1,
	},
	modalOptions: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	modalOption: {
	},
	renameOption: {
		borderRadius: 4,
		backgroundColor: 'teal',
	},
	icon: {
		justifyContent: 'center',
	},
	barsIcon: {
		alignSelf: 'flex-end',
		marginRight: 20,
		marginTop: 80,
	},
});
