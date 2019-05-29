import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	PermissionsAndroid,
	Platform
} from 'react-native';
import T from 'prop-types'
import s from '../../styles/Control/RecordControl';
import Icon from '../../styles/Icon';
import colors from '../../styles/colors';
import { chooseNameForNewUnit } from '../../utils'
import { BASE_URL } from '../../constants/constants';
import { UnitType } from '../../constants/enumerables';

import { AudioRecorder } from 'react-native-audio';

class RecordControl extends Component {
	// ! problem seems to be that props are received from redux store asynchronously. This results in this.state.audioPath being inaccurate when componentMounts, because the directory hasn't actually been read properly
	state = {
		currentTime: 0.0,
		audioPath: `${BASE_URL}${this.props.currentRelativePath}/${chooseNameForNewUnit(this.props.units, UnitType.File)}`,
		// audioPath: undefined,
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
		console.log('this.props', this.props)
		console.log('this.state', this.state)

		setTimeout(() => {
			console.log('this.props after 1 second', this.props)
			console.log('this.state after 1 second', this.state)
		}, 100);

		this.requestMicrophonePermission() //could this be moved to index.js so the fun. isn't called each time user goes to RecordControl?
		AudioRecorder.requestAuthorization().then((isAuthorised) => {
			this.setState({ hasPermission: isAuthorised });

			if (!isAuthorised) return;

			setTimeout(() => {
				this.setState({
					audioPath: `${BASE_URL}${this.props.currentRelativePath}/${chooseNameForNewUnit(this.props.units, UnitType.File)}`
				})
			}, 100);

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
		const { isRecording, startRecording, stoppedRecording, pauseRecording, stopRecording, finishRecording, units } = this.props;
		// const { audioPath } = this.state;

		console.log('recording');
		if (isRecording) {
			console.warn('Already recording!');
			return;
		}

		if (!this.state.hasPermission) {
			console.warn('Can\'t record, no permission granted!');
			return;
		}
		// console.log('units', units.map(unit => unit.name))
		// console.log("newUnitName:", chooseNameForNewUnit(units, UnitType.File));
		if (stoppedRecording) {
			this.setState({
				audioPath: `${BASE_URL}${this.props.currentRelativePath}/${chooseNameForNewUnit(units, UnitType.File)}`
			})
			await this.prepareRecordingPath(this.state.audioPath);
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
		const { isRecording, pauseRecording } = this.props;
		console.log('pausing');
		if (!isRecording) {
			console.warn('Can\'t pause, not recording!');
			return;
		}

		try {
			// const filePath = await AudioRecorder.pauseRecording();
	    await AudioRecorder.pauseRecording();
			pauseRecording(true)
		} catch (error) {
			console.error(error);
		}
	}

	async _resume() {
		const { isPaused, pauseRecording } = this.props
		if (!isPaused) {
			console.warn('Can\'t resume, not paused!');
			return;
		}

		try {
			console.log("resuming recording");
			await AudioRecorder.resumeRecording();
			pauseRecording(false)
		} catch (error) {
			console.error(error);
		}
	}

	async _stop(saveRecording) {
		const { isRecording, pauseRecording, startRecording, stopRecording, currentRelativePath, units } = this.props;

		if (!isRecording) {
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
				await AudioRecorder.stopRecording();
				const filePath = this.state.audioPath

				if (Platform.OS === 'android') {
					this._finishRecording(true, filePath);
				}
				return filePath;
			} catch (error) {
				console.error(error);
			}
		}
	}

	async _finishRecording(didSucceed, filePath, fileSize) {
		console.log("recording succeeded");
		const { finishRecording } = this.props;
		this.setState({ currentTime: 0.0 })
		// this.setState({ finished: didSucceed });
		await finishRecording(didSucceed)
		console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
	}

	render() {
		const { isRecording, isPaused } = this.props;

		return (
			<View style={s.container}>
				{isRecording &&
					<TouchableOpacity onPress={() => this._stop(false)}>
						<Icon name='cross' size={40} color={colors.white} />
					</TouchableOpacity>
				}
				<View style={s.recordButtonContainer}>
					{isRecording && !isPaused ?
						<TouchableOpacity style={s.icon}
							onPress={() =>
								this._pause()
							}
						>
							<Image source={require('../../../assets/images/pause.png')} style={{ width: 80, height: 80 }} />
						</TouchableOpacity>
							:
						<TouchableOpacity style={s.icon}
							onPress={isRecording && isPaused ?
								() => this._resume()
									:
								() => this._record()
							}
						>
							<Image source={require('../../../assets/images/microphone.png')} style={{ width: 80, height: 80}}/>
						</TouchableOpacity>
					}
					<Text style={s.recordTimer}>{this.state.currentTime}</Text>
				</View>

				{isRecording &&
					<TouchableOpacity onPress={() => this._stop(true)}>
						<Icon name='checkmark' size={40} color={colors.white} />
					</TouchableOpacity>
				}
			</View>
		);
	}
}

RecordControl.propTypes = {
	isRecording: T.bool.isRequired,
	isPaused: T.bool.isRequired,
	stoppedRecording: T.bool.isRequired,
	finished: T.bool.isRequired,
	startRecording: T.func,
	pauseRecording: T.func,
	stopRecording: T.func,
	finishRecording: T.func,
}

mapStateToProps = (state) => {
	console.log("mapstatetoprops ran");
	return {
		currentRelativePath: state.currentRelativePath,
		units: state.units
	}
}

export default connect(mapStateToProps)(RecordControl);
