import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image
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
					<Image source={require('../../../assets/images/cross.png')} style={{ width: 40, height: 40 }} />
				</TouchableOpacity>
				<TouchableOpacity style={s.icon} onPress={this.props.startRecording}>
					{this.props.recording ?
						<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
							:
						<Image source={require('../../../assets/images/microphone.png')} style={{ width: 80, height: 80 }} />
					}
				</TouchableOpacity>
				<TouchableOpacity>
					<Image source={require('../../../assets/images/checkmark.png')} style={{ width: 40, height: 40 }} />
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
