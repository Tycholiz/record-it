import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import T from 'prop-types'
import s from '../../styles/Control/RecordControl';
import Icon from '../../styles/Icon';
import colors from '../../styles/colors';
import { chooseNameForNewUnit } from '../../utils'
import { BASE_URL } from '../../constants/constants';

import { AudioRecorder } from 'react-native-audio';
import Sound from 'react-native-sound';

import { startRecording } from '../../actions/index'

class RecordControl extends Component {
	state = {
		currentTime: 0.0,
		recording: false,
		paused: false,
		stoppedRecording: false,
		finished: false,
		audioPath: `${BASE_URL}${this.props.currentRelativePath}/Audio(1)`,
		hasPermission: undefined,
	};

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

	async _play() {
		if (this.state.recording) {
			await this._stop();
		}

		// These timeouts are a hacky workaround for some issues with react-native-sound.
		// See https://github.com/zmxv/react-native-sound/issues/89.
		setTimeout(() => {
			var sound = new Sound(this.state.audioPath, '', (error) => {
				if (error) {
					console.log('failed to load the sound', error);
				}
			});

			setTimeout(() => {
				sound.play((success) => {
					if (success) {
						console.log('successfully finished playing');
					} else {
						console.log('playback failed due to audio decoding errors');
					}
				});
			}, 100);
		}, 100);
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

	render() {
		const { recording } = this.props;

		return (
			<View style={s.container}>
				{recording &&
					<TouchableOpacity>
						<Icon name='cross' size={40} color={colors.white} />
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
