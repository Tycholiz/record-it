import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { } from 'expo';
import s from '../../styles/Control/RecordControl';

import { startRecording } from '../../actions/index'

import Icon from 'react-native-vector-icons/FontAwesome';
const cancelIcon = (<Icon name="times" size={40} color='white' />)
const microphoneIcon = (<Icon name="microphone" size={50} color='black' />)
const pauseIcon = (<Icon name="pause" size={50} color='black' />)
const acceptIcon = (<Icon name="check" size={40} color='white' />)



class RecordControl extends Component {
	render() {
		return (
			<View style={s.container}>
				<TouchableOpacity>
					{cancelIcon}
				</TouchableOpacity>
				<TouchableOpacity style={s.icon} onPress={this.props.startRecording}>
					{this.props.recording ? pauseIcon : microphoneIcon}
				</TouchableOpacity>
				<TouchableOpacity onPress={this.sayHi}>
					{acceptIcon}
				</TouchableOpacity>
			</View>
		);
	}
}

mapStateToProps = (state) => {
	return {
		recording: state.toggle.recording
	}
}

export default connect(mapStateToProps, { startRecording })(RecordControl);
