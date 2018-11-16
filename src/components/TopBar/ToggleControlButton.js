import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import s from '../../styles/TopBar/ToggleControlButton';

import { toggleControlView } from '../../actions'

class ToggleControlButton extends Component {
	render() {

		return (
			<TouchableOpacity
				style={s.container}
				onPress={this.props.toggleControlView}
			>
				<View>
					<Text style={s.buttonText}>
						{this.props.toggleText}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

mapStateToProps = (state) => {
	return {
		toggleText: state.toggle.toggleText
	}
}

export default connect(mapStateToProps, { toggleControlView })(ToggleControlButton);
