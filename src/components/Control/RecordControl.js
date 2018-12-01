import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import s from '../../styles/Control/RecordControl';

import { startRecording } from '../../actions/index'

// import Icon from 'react-native-vector-icons/FontAwesome';
// const cancelIcon = (<Icon name="times" size={40} color='white' />)
// const microphoneIcon = (<Icon name="microphone" size={50} color='black' />)
// const pauseIcon = (<Icon name="pause" size={50} color='black' />)
// const acceptIcon = (<Icon name="check" size={40} color='white' />)



class RecordControl extends Component {
	render() {
		return (
			<View style={s.container}>
				<TouchableOpacity>
					<Ionicons name="md-at" size={32} color="green" />
				</TouchableOpacity>
				<TouchableOpacity style={s.icon} onPress={this.props.startRecording}>
					{this.props.recording ?
						<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
							:
						// <Ionicons name="md-microphone" size={32} color="green" />
						<Image source={require('../../../assets/images/microfono.png')} style={{ width: 80, height: 80 }} />
					}
				</TouchableOpacity>
				<TouchableOpacity onPress={this.sayHi}>
					<Ionicons name="md-checkmark" size={32} color="green" />
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
