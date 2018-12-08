import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
} from 'react-native';

import Modal from "react-native-modal";
import s from '../../styles/TopBar/BreadcrumbBar';

import { displayBreadCrumb } from '../../utils';

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
						<Image source={require('../../../assets/images/search.png')} style={{ width: 20, height: 20 }} />
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