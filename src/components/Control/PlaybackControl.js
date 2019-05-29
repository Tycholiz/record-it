import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Slider
} from 'react-native';
import T from 'prop-types'
import s from '../../styles/Control/PlaybackControl';

import Modal from "react-native-modal";
import Icon from '../../styles/Icon';
import colors from '../../styles/colors';

import Sound from 'react-native-sound';

import { UnitType } from '../../constants/enumerables';
import { extractEndPoint } from '../../utils'
import { BASE_URL } from '../../constants/constants';

import { setActiveFile } from '../../actions/index'

class PlaybackControl extends Component {
	state = {
		playState: 'paused',
		playSeconds: 0,
		duration: 0,
		deleteConfirmation: false,
	};

	handleOpenModal = () => {
		this.setState(() => {
			return {
				deleteConfirmation: true
			};
		});
	};

	handleCloseModal = () => {
		this.setState(() => {
			return {
				deleteConfirmation: false
			};
		});
	}

	handleDelete = (unitId) => {
		const { dispatch } = this.props;

		dispatch(setActiveFile(null));

		this.handleCloseModal();
	};

	async _play() {
		const { isRecording, activeFile, stopRecording, currentRelativePath } = this.props;

		// const activeFilePath = `${BASE_URL}${currentRelativePath}/${activeFile}`

		if (isRecording) {
			await stopRecording();
		}

		setTimeout(() => {
			console.log('activeFile', activeFile)
			var sound = new Sound(activeFile, Sound.MAIN_BUNDLE, (error) => {
				if (error) {
					console.log('failed to load the sound', error);
					return;
				}
				console.log(sound)
				sound.play((success) => {
					if (success) {
						console.log('successfully finished playing');
					} else {
						console.log('playback failed due to audio decoding errors');
						sound.release();
					}
				});
			});

			// setTimeout(() => {
			// }, 100);
		}, 100);
	}

	render() {
		const { isPlaying, activeFile, title } = this.props;

		return (
			<View style={s.container}>
				{activeFile ? (

					<View>
						<View style={s.topLine}>
							<Text style={s.text}>{extractEndPoint(activeFile)}</Text>
							<View style={s.iconContainer}>
								<TouchableOpacity onPress={() => this.handleOpenModal()}>
										<Icon name='garbage' size={25} color={colors.white} />
								</TouchableOpacity>
							</View>
						</View>

						<View style={s.clipScroll}>
							<Text style={s.time}>
								00:05
							</Text>
							{/* <Text style={[s.time, s.scroller]}>
								-----------O-----------------------------------
							</Text> */}
							<Slider style={{flex: 1, alignSelf: 'center'}}
							/>
							<Text style={s.time}>
								00:34
							</Text>
						</View>

						<View style={s.clipNavigation}>
							<TouchableOpacity>
								<Icon name='fastbackward' size={32} color={colors.white} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this._play()}>
								{isPlaying ?
									<Image source={require('../../../assets/images/pause.png')} style={{ width: 70, height: 70 }} />
									:
									<Image source={require('../../../assets/images/play.png')} style={{ width: 70, height: 70 }} />
								}
							</TouchableOpacity>
							<TouchableOpacity>
								<Icon name='fastforward' size={32} color={colors.white} />
							</TouchableOpacity>
						</View>

					</View>
					)	: (
					<View style={{justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{color: 'whitesmoke'}}>Please select an audio clip</Text>
					</View>
					)
				}

				{/* DELETE CONFIRMATION MODAL */}
				<Modal
					onBackdropPress={() => this.setState({ deleteConfirmation: false })}
					isVisible={this.state.deleteConfirmation}
					style={s.modalContainer}
					avoidKeyboard={true}
				>
					<View style={s.modalContainerInner}>
						<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this clip?</Text>
						<Text style={s.breadCrumb}>{title}</Text>
						<View style={s.modalOptions}>
							<TouchableOpacity
								onPress={() => {
									this.handleCloseModal();
								}}
							>
								<Text style={[s.modalOption, s.cancelOption]}>CANCEL</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.handleDelete(activeFile)
								}}
							>
								<Text style={[s.modalOption, s.confirmOption]}>CONFIRM</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

PlaybackControl.propTypes = {
	// playing: T.bool.isRequired,
	// title:
	// activeFile:
}

mapStateToProps = (state) => {
	return {
		playing: state.toggle.playing,
		activeFile: state.activeFile,
		// title: state.activeFile && state.units.files[state.activeFile].title,
	};
};

export default connect(mapStateToProps)(PlaybackControl);
