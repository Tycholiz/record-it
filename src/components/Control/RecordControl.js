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
import { AudioRecorder, AudioUtils } from 'react-native-audio';

import s from '../../styles/Control/RecordControl';
import Icon from '../../styles/Icon';
import colors from '../../styles/colors';

import { RecordStatus } from '../../constants/enumerables';

class RecordControl extends Component {

	state = {
		currentTime: 0.0,
		recording: false,
		paused: false,
		stoppedRecording: false,
		finished: false,
		audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
		hasPermission: undefined,
	};

	prepareRecordingPath(audioPath) {
		AudioRecorder.prepareRecordingAtPath(audioPath, {
			SampleRate: 22050,
			Channels: 1,
			AudioQuality: "High",
			AudioEncoding: "aac",
			AudioEncodingBitRate: 32000
		});
	}

	componentDidMount() {
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

	async _pause() {
		if (!this.state.recording) {
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
		if (!this.state.recording) {
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

	async _record() {
		if (this.state.recording) {
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

		this.setState({ recording: true, paused: false });

		try {
			const filePath = await AudioRecorder.startRecording();
		} catch (error) {
			console.error(error);
		}
	}

	_finishRecording(didSucceed, filePath, fileSize) {
		this.setState({ finished: didSucceed });
		console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
	}

	handlePressRecord = () => {
		const { recording, paused } = this.state;

		if (!recording && !paused) {
			this._record();
		} else if (recording && !paused) {
			this._pause();
		} else if (recording && paused) {
			this._resume();
		}
	}

	handleAccept = () => {
		this._stop();
	}

	handleCancel = () => {
		this._cancelRecording();
	}

	render() {
		const { isRecording, isPaused, havePermission, durationMillis } = this.state;

		return !havePermission ? (
			<View>
				<Text style={s.permissionWarning}>You must enable audio recording permissions in order to use this app.</Text>
			</View>
			) : (
			<View style={s.container}>
				<View style={s.containerInner}>
					{/* {isRecording || isPaused ? */}
						<TouchableOpacity onPress={() => this.handleCancel()} style={s.iconCancelAccept}>
							<Icon name='cross' size={40} color={colors.white} />
						</TouchableOpacity>
							{/* :
						null
					} */}
					<View style={s.microphoneContainer}>
						<Text style={s.timeElapsed}>
							{isRecording || isPaused ? {currentSliderValue} : ''}
						</Text>
						<TouchableOpacity style={s.icon} onPress={() => this.handlePressRecord()}>
							{isRecording ?
								<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
									:
								<Image source={require('../../../assets/images/microphone.png')} style={{ width: 80, height: 80 }} />
							}
						</TouchableOpacity>
					</View>

					{/* {isRecording || isPaused ? */}
						<TouchableOpacity onPress={() => this.handleAccept()} style={s.iconCancelAccept}>
							<Icon name='checkmark' size={40} color={colors.white} />
						</TouchableOpacity>
							{/* :
						null
					} */}

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
