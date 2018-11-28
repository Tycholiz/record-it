import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import s from '../../styles/TopBar/ToggleControlButton';
import LinearGradient from 'react-native-linear-gradient';

import { toggleControlView } from '../../actions'

class ToggleControlButton extends Component {
	render() {
		const { toggleControlView } = this.props;

		return (
			<View
				style={s.container}

			>
				<View
					style={s.controlViewButton}
				>
					<TouchableOpacity onPress={toggleControlView}>
						<Text style={s.buttonText}>
							Record
						</Text>
					</TouchableOpacity>
					{/* <View style={s.toggleControlIndicator}></View> */}
					<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={s.toggleControlIndicator}></LinearGradient>
				</View>
				<View
					style={s.controlViewButton}
				>
					<TouchableOpacity onPress={toggleControlView}>
						<Text style={s.buttonText}>
							Playback
						</Text>
					</TouchableOpacity>
					<View style={s.toggleControlIndicator}></View>
				</View>
			</View>
		);
	}
}

mapStateToProps = (state) => {
	return {
		toggleText: state.toggle.toggleText
	}
}

export default connect(mapStateToProps, { toggleControlView })(ToggleControlButton);
