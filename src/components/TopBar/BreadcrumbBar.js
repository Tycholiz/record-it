import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Modal from "react-native-modal";
import s from '../../styles/TopBar/BreadcrumbBar';

import { displayBreadCrumb } from '../../utils';

// import Icon from 'react-native-vector-icons/FontAwesome';
// const searchIcon = (<Icon name="search" size={30} color='black' />)

class BreadcrumbBar extends Component {
	state = {
		modalOpen: false
	}
	render() {
		const { state } = this.props;
		const { modalOpen } = this.state;
		return (
			<View>
				<TouchableOpacity style={s.container} onPress={() => this.setState({ modalOpen: true })}>
					<Text style={s.text}>{displayBreadCrumb(state)}</Text>
					<View style={s.searchIcon}>
						<Ionicons name="md-search" size={32} color="green" />
					</View>
				</TouchableOpacity>
				{/* <Modal
					isVisible={modalOpen}
				>
					<Text>Hey maw</Text>
				</Modal> */}
			</View>
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