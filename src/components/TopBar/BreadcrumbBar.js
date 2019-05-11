import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
} from 'react-native';
import { showShortDirPath } from '../../utils'
import Icon from '../../styles/Icon';
import colors from '../../styles/colors';

import Modal from "react-native-modal";
import s from '../../styles/TopBar/BreadcrumbBar';

class BreadcrumbBar extends Component {
	state = {
		modalOpen: false
	}
	render() {
		const { state, currentRelativePath } = this.props;
		const { modalOpen } = this.state;

		return (
			<View>
				<TouchableOpacity style={s.container} onPress={() => this.setState({ modalOpen: true })}>
					<Text style={s.text}>{showShortDirPath(currentRelativePath)}</Text>
					<View style={s.searchIcon}>
						<Icon name='search' size={22} color={colors.darkgrey} />
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
		currentRelativePath: state.currentRelativePath,
		state
	};
}

export default connect(mapStateToProps)(BreadcrumbBar);