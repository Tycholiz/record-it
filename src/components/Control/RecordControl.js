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

import { RecordStatus } from '../../constants/enumerables';



class RecordControl extends Component {

	constructor(props) {
		super(props);
		this.sound = null;
		this.recording = null;
		this.state = {
			...initialState,
		};
	}

	componentDidMount() {
		this._askForPermissions();
	}

	componentWillUnmount = () => {
		this.setState({ ...initialState });
		if (this.sound) {
			this.sound.setOnPlaybackStatusUpdate(null)
		}
		if (this.recording) {
			this.recording.setOnRecordingStatusUpdate(null);
		}
	};

	addDebugStatement = (statement) => {
		this.setState({
			debugStatements: this.state.debugStatements.concat(`- ${statement}\n`)
		});
	};

	_askForPermissions = async () => {
		const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		this.setState({
			havePermission: response.status === 'granted',
		});
	};

	updateScreenForRecordingStatus = (status) => {
		//
		if (!status.isRecording) {
			this.setState({
				recordStatus: RecordStatus.NotRecording
			});
			this.addDebugStatement(`NOT_RECORDING: ${status.durationMillis}`);
		} else if (status.isRecording) {
			this.setState({
				recordStatus: RecordStatus.NotRecording,
				recordingDuration: status.durationMillis,
				currentSliderValue: status.durationMillis
			});
			this.addDebugStatement(`RECORDING: ${status.durationMillis}`);
		} else if (status.isDoneRecording) {
			this.setState({
				recordStatus: RecordStatus.RecordingComplete,
				recordingDuration: status.durationMillis
			});
			this.addDebugStatement(`isDoneRecording: ${status.durationMillis}`);

      /* if (!this.state.isLoading) {
        this.stopRecordingAndEnablePlayback();
      } */
		}
	};

	_beginRecording = async () => {
		// check to see if there is already a sound object loaded and unload it
		// if there is
		if (this.sound !== null) {
			try {
				this.sound.setOnPlaybackStatusUpdate(null);
				await this.sound.unloadAsync().then(() => {
					this.addDebugStatement('******** sound unloaded ********');
				});
			} catch (error) {
				this.addDebugStatement(`Error: unloadAsync ${error}`);
			}
			this.sound.setOnPlaybackStatusUpdate(null);
			this.sound = null;
		}

		// check to see if there is already a recording object loaded and unload it
		// if there is
		try {
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				allowsRecordingIOS: true,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				shouldDuckAndroid: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				playThroughEarpieceAndroid: false,
			});
			if (this.recording !== null) {
				this.recording.setOnRecordingStatusUpdate(null);
				this.recording = null;
			}
		} catch (error) {
			this.addDebugStatement(`Error: setAudioModeAsync ${error}`);
			console.log(`Error: setAudioModeAsync ${error}`)
		}

		const recording = new Audio.Recording();
		try {
			console.log("1")
			await recording.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
			console.log("2")

			recording.setOnRecordingStatusUpdate(
				this.updateScreenForRecordingStatus.bind(this)
			);

			console.log(recording.getStatusAsync())
			await recording.startAsync();
			console.log("4")

			this.setState({
				recordStatus: RecordStatus.Recording,
				isRecording: true,
				maxSliderValue: this.props.maxDurationMillis
			});
			this.recording = recording;
			console.log("we are now recording")
			// console.log(recording.getStatusAsync())
		} catch (error) {
			console.log(`Error: startAsync: ${error}`);
			this.addDebugStatement(`Error: startAsync: ${error}`);
			this.setState({ recordStatus: RecordStatus.Error });
		}
	}

	_pauseRecording = async () => {
		try {
			await this.recording.pauseAsync();
			this.setState({
				recordStatus: RecordStatus.Paused
			});
		} catch(error) {
			console.log(`Error: pauseAsync: ${error}`)
			this.addDebugStatement(`Error: pauseAsync: ${error}`);
		}
	}

	_acceptRecording = async () => {
		try {
			await this.recording.stopAndUnloadAsync();
			this.recording.setOnRecordingStatusUpdate(null);
			this.addDebugStatement(' +++ unloading recording +++ ');
			this.setState({
				isRecording: false,
				isPaused: false,
				recordStatus: RecordStatus.RecordingComplete
			});
		} catch (error) {
			this.addDebugStatement(`Error: stopAndUnloadAsync ${error}`);
			this.setState({
				recordStatus: RecordStatus.Error,
			});
		}

		let info;
		try {
			info = await FileSystem.getInfoAsync(this.recording.getURI());
			console.log(`FILE INFO: ${JSON.stringify(info)}`);
		} catch (error) {
			this.addDebugStatement(`Error: FileSystem.getInfoAsync ${error}`);
			this.setState({
				recordStatus: RecordStatus.Error
			});
		}

		this.addDebugStatement(`FILE INFO: ${JSON.stringify(info)}`);

		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				playsInSilentLockedModeIOS: true,
				shouldDuckAndroid: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			});
			this.setState({
				recordStatus: RecordStatus.RecordingComplete
			});
		} catch(error) {
			this.addDebugStatement(`Error: Audio.setAudioModeAsync ${error}`);
			this.setState({
				recordStatus: RecordStatus.Error,
			});
		}

		// now that recording is complete, create and load a new sound object
    // to save to component state so that it can be played back later
		try {
			const { sound, status } = await this.recording.createNewLoadedSound(
				null,
				this.onPlaybackStatusUpdate
			);

			this.setState({
				soundFileInfo: { ...info, durationMillis: status.durationMillis }
			});

			this.setState({
				positionMillis: status.positionMillis,
				durationMillis: status.durationMillis,
				maxSliderValue: status.durationMillis,
				currentSliderValue: 0
			});

			this.sound = sound;
		} catch (error) {
			this.addDebugStatement(`Error: createNewLoadedSound ${error}`);
		}
		this.setState({
			recordStatus: RecordStatus.RecordingComplete
		});
	}

	_cancelRecording = async () => {
		try {
			await this.recording.stopAndUnloadAsync();
			this.recording.setOnRecordingStatusUpdate(null);
			this.addDebugStatement(' +++ unloading recording +++ ');
			this.setState({
				isRecording: false,
				isPaused: false,
				recordStatus: RecordStatus.NotRecording
			});
		} catch (error) {
			this.addDebugStatement(`Error: stopAndUnloadAsync ${error}`);
			console.log(`Error: stopAndUnloadAsync ${error}`)
			this.setState({
				recordStatus: RecordStatus.Error,
			});
		}
	}


	handlePressRecord = () => {
		const { isRecording } = this.state;

		if (!isRecording) {
			this._beginRecording();
		} else if (isRecording) {
			this.setState({ isPaused: true, isRecording: false });
			this._pauseRecording();
		}
	}

	handleAccept = () => {
		this._acceptRecording();
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
