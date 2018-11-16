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
import s from '../../styles/TopBar/BreadcrumbBar';

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
			<TouchableOpacity style={s.container} onPress={() => this.setState({ modalOpen: true })}>
				<Text style={s.text}>{displayBreadCrumb(state)}</Text>
				<View style={s.searchIcon}>
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