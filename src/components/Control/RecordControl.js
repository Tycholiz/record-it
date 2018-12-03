import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import s from '../../styles/Control/RecordControl';

import { startRecording } from '../../actions/index'

class RecordControl extends Component {
	render() {
		const { recording } = this.props;

		return (
			<View style={s.container}>
				{recording &&
					<TouchableOpacity>
						<Image source={require('../../../assets/images/cross.png')} style={{ width: 40, height: 40 }} />
					</TouchableOpacity>
				}
				<TouchableOpacity style={s.icon} onPress={this.props.startRecording}>
					{this.props.recording ?
						<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
							:
						<Image source={require('../../../assets/images/microphone.png')} style={{ width: 80, height: 80 }} />
					}
				</TouchableOpacity>
				{recording &&
					<TouchableOpacity>
						<Image source={require('../../../assets/images/checkmark.png')} style={{ width: 40, height: 40 }} />
					</TouchableOpacity>
				}
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
