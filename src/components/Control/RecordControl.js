import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import Expo, {
	Asset,
	Audio,
	FileSystem,
	Font,
	Permissions
} from 'expo';
import s from '../../styles/Control/RecordControl';
import Icon from '../../styles/Icon';
import colors from '../../styles/colors';

// import { startRecording } from '../../actions/index'

// import Sound from 'react-native-sound';
// import { AudioRecorder, AudioUtils } from 'react-native-audio';

class RecordControl extends Component {
	state = {
		currentTime: 0.0,
		recording: false,
		paused: false,
		stoppedRecording: false,
		finished: false,
		// audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
		havePermission: false,
	};

	componentDidMount() {
		this._askForPermissions();
	}

	_askForPermissions = async () => {
		const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		this.setState({
			havePermission: response.status === 'granted',
		});
	};

	handlePressRecord = () => {
		const { recording, paused } = this.state;

		if (!recording) {
			this.setState({ recording: true });
		} else if (recording) {
			this.setState({ paused: true, recording: false });
		}
	}

	handleAccept = () => {
		const { recording, paused } = this.state;

		this.setState({ recording: false, paused: false })
	}

	handleCancel = () => {
		const { recording, paused } = this.state;

		this.setState({ recording: false, paused: false })
	}

	render() {
		const { recording, paused, havePermission } = this.state;

		return !havePermission ? (
			<View>
				<Text>You must enable audio recording permissions in order to use this app.</Text>
			</View>
			) : (
			<View style={s.container}>
				<View style={s.containerInner}>
					{recording || paused ?
						<TouchableOpacity onPress={() => this.handleCancel()} style={s.iconCancelAccept}>
							<Icon name='cross' size={40} color={colors.white} />
						</TouchableOpacity>
							:
						null
					}
					<View style={s.microphoneContainer}>
						<Text style={s.timeElapsed}>0:03</Text>
						<TouchableOpacity style={s.icon} onPress={() => this.handlePressRecord()}>
							{recording ?
								<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
									:
								<Image source={require('../../../assets/images/microphone.png')} style={{ width: 80, height: 80 }} />
							}
						</TouchableOpacity>
					</View>

					{recording || paused ?
						<TouchableOpacity onPress={() => this.handleAccept()} style={s.iconCancelAccept}>
							<Icon name='checkmark' size={40} color={colors.white} />
						</TouchableOpacity>
							:
						null
					}

				</View>

			</View>
		);
	}
}

mapStateToProps = (state) => {
	return {
		// recording: state.toggle.recording
	}
}

export default connect(mapStateToProps)(RecordControl);
