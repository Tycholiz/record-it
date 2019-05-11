import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import T from 'prop-types'
import s from '../../styles/TopBar/ToggleControlButton';
import LinearGradient from 'react-native-linear-gradient';

import { ControlView } from '../../constants/enumerables';

import { toggleControlView } from '../../actions'

class ToggleControlButton extends Component {
	render() {
		const { toggleControlView, controlView } = this.props;

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
					{/* TODO: add some animation to toggle */}
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						colors={[controlView !== ControlView.Record ? 'transparent' : 'red', 'transparent']}
						style={s.linearGradient}
					/>
				</View>
				<View
					style={s.controlViewButton}
				>
					<TouchableOpacity onPress={toggleControlView}>
						<Text style={s.buttonText}>
							Playback
						</Text>
					</TouchableOpacity>
					<LinearGradient
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 0 }}
						colors={[controlView !== ControlView.Playback ? 'transparent' : 'red', 'transparent']}
						style={s.linearGradient}
					/>
				</View>
			</View>
		);
	}
}

ToggleControlButton.propTypes = {
	controlView: T.string.isRequired,
	toggleControlView: T.func.isRequired
}

mapStateToProps = (state) => {
	return {
		toggleText: state.toggle.toggleText,
		controlView: state.toggle.controlView
	}
}

export default connect(mapStateToProps, { toggleControlView })(ToggleControlButton);
