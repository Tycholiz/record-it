import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	AppRegistry,
	PermissionsAndroid,
	Platform
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
		audioPath: `${BASE_URL}${this.props.currentRelativePath}/${chooseNameForNewUnit(this.props.units, "file")}`,
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

			// this.prepareRecordingPath(this.state.audioPath);

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
		const { recording, startRecording, stoppedRecording, pauseRecording, stopRecording } = this.props;
		const { audioPath } = this.state;

		this.prepareRecordingPath(this.state.audioPath);

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

		if (stoppedRecording) {
			console.log("before prepareRecordingPath")
			// this.prepareRecordingPath(audioPath);
			console.log("after prepareRecordingPath")

		}

		startRecording(true)
		pauseRecording(false)

		try {
			const filePath = await AudioRecorder.startRecording();
		} catch (error) {
			console.error(error);
		}
	}

	async _pause() {
		const { recording, pauseRecording } = this.props;
		console.log('pausing');
		if (!recording) {
			console.warn('Can\'t pause, not recording!');
			return;
		}

		try {
			const filePath = await AudioRecorder.pauseRecording();
			pauseRecording(true)
		} catch (error) {
			console.error(error);
		}
	}

	async _resume() {
		const { paused, pauseRecording } = this.props
		if (!paused) {
			console.warn('Can\'t resume, not paused!');
			return;
		}

		try {
			console.log("resuming recording");
			await AudioRecorder.resumeRecording();
			// this.setState({ paused: false });
			pauseRecording(false)
		} catch (error) {
			console.error(error);
		}
	}

	async _stop(saveRecording) {
		const { recording, pauseRecording, startRecording, stopRecording, currentRelativePath } = this.props;

		if (!recording) {
			console.warn('Can\'t stop, not recording!');
			return;
		}

		pauseRecording(false)
		startRecording(false)
		stopRecording(true)

		if (saveRecording) {
			console.log("attempting to save recording");
			try {
				// const filePath = await AudioRecorder.stopRecording();
				const filePath = `${BASE_URL}${currentRelativePath}/${chooseNameForNewUnit(this.props.units, "file")}`

				if (Platform.OS === 'android') {
					this._finishRecording(true, filePath);
				}
				return filePath;
			} catch (error) {
				console.error(error);
			}
		}
	}

	_finishRecording(didSucceed, filePath, fileSize) {
		console.log("recording succeeded");
		const { finishRecording } = this.props;
		// this.setState({ finished: didSucceed });
		finishRecording(didSucceed)
		console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
	}

	render() {
		const { recording, paused } = this.props;

		return (
			<View style={s.container}>
				{recording &&
					<TouchableOpacity onPress={() => this._stop(false)}>
						<Icon name='cross' size={40} color={colors.white} />
					</TouchableOpacity>
				}

				{recording && !paused ?
					<TouchableOpacity style={s.icon}
						onPress={() =>
							this._pause()
						}
					>
						<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
					</TouchableOpacity>
						:
					<TouchableOpacity style={s.icon}
						onPress={recording && paused ?
							() => this._resume()
								:
							() => this._record()
						}
					>
						<Image source={require('../../../assets/images/microphone.png')} style={{ width: 80, height: 80 }} />
					</TouchableOpacity>
				}

				{recording &&
					<TouchableOpacity onPress={() => this._stop(true)}>
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
		currentRelativePath: state.currentRelativePath,
		units: state.units
	}
}

export default connect(mapStateToProps, { startRecording })(RecordControl);
