import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	AppRegistry,
	PermissionsAndroid,
} from 'react-native';
import T from 'prop-types'
import s from '../../styles/Control/RecordControl';
import Icon from '../../styles/Icon';
import colors from '../../styles/colors';
import { chooseNameForNewUnit } from '../../utils'
import { BASE_URL } from '../../constants/constants';

import { AudioRecorder } from 'react-native-audio';

import { startRecording } from '../../actions/index'

class RecordControl extends Component {
	state = {
		currentTime: 0.0,
		paused: false,
		stoppedRecording: false,
		finished: false,
		audioPath: `${BASE_URL}${this.props.currentRelativePath}/Audio(4).aac`,
		hasPermission: undefined,
	};

	requestMicrophonePermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
				{
					title: 'RecordIt Recording Permission',
					message:
						'Recordit needs access to your microphone ' +
						'so you can record.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the mic');
			} else {
				console.log('Mic permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	}

	prepareRecordingPath(audioPath){
		AudioRecorder.prepareRecordingAtPath(audioPath, {
			SampleRate: 22050,
			Channels: 1,
			AudioQuality: "Low",
			AudioEncoding: "aac",
			AudioEncodingBitRate: 32000
		});
	}

	componentDidMount() {
		// this.requestMicrophonePermission()
		AudioRecorder.requestAuthorization().then((isAuthorised) => {
			this.setState({ hasPermission: isAuthorised });

			if (!isAuthorised) return;

			this.prepareRecordingPath(this.state.audioPath);

			AudioRecorder.onProgress = (data) => {
				this.setState({ currentTime: Math.floor(data.currentTime) });
			};

			AudioRecorder.onFinished = (data) => {
				// Android callback comes in the form of a promise instead.
				if (Platform.OS === 'ios') {
					this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
				}
			};
		});
	}

	async _record() {
		const { recording, startRecording } = this.props;

		console.log('recording');
		// if (this.state.recording) {
		if (recording) {
			console.warn('Already recording!');
			return;
		}

		if (!this.state.hasPermission) {
			console.warn('Can\'t record, no permission granted!');
			return;
		}

		if (this.state.stoppedRecording) {
			this.prepareRecordingPath(this.state.audioPath);
		}

		startRecording()

		this.setState({
			// recording: true,
			paused: false
		});

		try {
			const filePath = await AudioRecorder.startRecording();
		} catch (error) {
			console.error(error);
		}
	}

	async _pause() {
		const { recording } = this.props;
		console.log('pausing');
		// if (!this.state.recording) {
		if (!recording) {
			console.warn('Can\'t pause, not recording!');
			return;
		}

		try {
			const filePath = await AudioRecorder.pauseRecording();
			this.setState({ paused: true });
		} catch (error) {
			console.error(error);
		}
	}

	async _resume() {
		if (!this.state.paused) {
			console.warn('Can\'t resume, not paused!');
			return;
		}

		try {
			await AudioRecorder.resumeRecording();
			this.setState({ paused: false });
		} catch (error) {
			console.error(error);
		}
	}

	async _stop() {
		const { recording } = this.props;

		// if (!this.state.recording) {
		if (!recording) {
			console.warn('Can\'t stop, not recording!');
			return;
		}

		this.setState({ stoppedRecording: true, recording: false, paused: false });

		try {
			const filePath = await AudioRecorder.stopRecording();

			if (Platform.OS === 'android') {
				this._finishRecording(true, filePath);
			}
			return filePath;
		} catch (error) {
			console.error(error);
		}
	}

	_finishRecording(didSucceed, filePath, fileSize) {
		this.setState({ finished: didSucceed });
		console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
	}

	render() {
		const { recording } = this.props;

		return (
			<View style={s.container}>
				{recording &&
					<TouchableOpacity onPress={() => this._stop()}>
						<Icon name='cross' size={40} color={colors.white} />
					</TouchableOpacity>
				}

				{recording ?
					<TouchableOpacity style={s.icon} onPress={() => this._pause()}>
						<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
					</TouchableOpacity>
						:
					<TouchableOpacity style={s.icon} onPress={() => this._record()}>
						<Image source={require('../../../assets/images/microphone.png')} style={{ width: 80, height: 80 }} />
					</TouchableOpacity>
				}

				{recording &&
					<TouchableOpacity onPress={() => this._finishRecording()}>
						<Icon name='checkmark' size={40} color={colors.white} />
					</TouchableOpacity>
				}
			</View>
		);
	}
}

RecordControl.propTypes = {
	recording: T.bool.isRequired
}

mapStateToProps = (state) => {
	return {
		recording: state.toggle.recording,
		currentRelativePath: state.currentRelativePath
	}
}

export default connect(mapStateToProps, { startRecording })(RecordControl);
