import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { displayBreadCrumb } from '../../utils';

import Icon from 'react-native-vector-icons/FontAwesome';
const searchIcon = (<Icon name="search" size={30} color='black' />)

class BreadcrumbBar extends Component {
	render() {
		return (
			<TouchableOpacity style={styles.container}>
				<Text style={styles.text}>{displayBreadCrumb(this.props.state)}</Text>
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
	}
});
