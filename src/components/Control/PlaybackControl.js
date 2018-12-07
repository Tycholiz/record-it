import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Text,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	TouchableHighlight
} from 'react-native';
import s from '../../styles/Control/PlaybackControl';
import Modal from "react-native-modal";

import { UnitType } from '../../constants/enumerables';

import { startPlaying, deleteUnit, setActiveFile } from '../../actions/index'

class PlaybackControl extends Component {
	state = {
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
		dispatch(deleteUnit(unitId, UnitType.File));
		this.handleCloseModal();
	};

	handlePlayButton = () => {
		const { dispatch } = this.props;
		dispatch(startPlaying());
	};

	render() {
		const { playing, activeFile, title } = this.props;
		return (
			<View style={s.container}>
				{activeFile ? (

					<View>
						<View style={s.topLine}>
							<Text style={s.text}>{title}.mp3</Text>
							<View style={s.iconContainer}>
								<TouchableOpacity onPress={() => this.handleOpenModal()}>
									<Image source={require('../../../assets/images/garbage.png')} style={{ width: 20, height: 25, margin: 6 }} />
								</TouchableOpacity>
							</View>
						</View>

						<View style={s.clipScroll}>
							<Text style={s.time}>
								00:10
							</Text>
							<Text style={[s.time, s.scroller]}>
								-----------O-----------------------------------
							</Text>
							<Text style={s.time}>
								00:34
							</Text>
						</View>

						<View style={s.clipNavigation}>
							<TouchableOpacity>
								<Image source={require('../../../assets/images/fastbackward.png')} style={{ width: 55, height: 40 }} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.handlePlayButton()}>
								{playing ?
									<Image source={require('../../../assets/images/play.png')} style={{ width: 70, height: 70 }} />
										:
									<Image source={require('../../../assets/images/pause.png')} style={{ width: 70, height: 70 }} />
								}
							</TouchableOpacity>
							<TouchableOpacity>
								<Image source={require('../../../assets/images/fastforward.png')} style={{ width: 55, height: 40 }} />
							</TouchableOpacity>
						</View>

					</View>
					)	: (
					<View>
						<Text>Please select an audio clip</Text>
					</View>
					)
				}

				{/* DELETE CONFIRMATION MODAL */}
					<Modal
						animationType="slide"
						transparent={true}
						visible={this.state.deleteConfirmation}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
						}}
					>
						<KeyboardAvoidingView style={s.modalMask} behavior="padding">
							<View style={s.modalContainer}>
								<Text>Are you sure you want to delete {title}?</Text>
								<View style={s.modalOptions}>
									<TouchableHighlight
										onPress={() => {
											this.handleCloseModal();
										}}
										style={s.modalOption}
									>
										<Text>CANCEL</Text>
									</TouchableHighlight>

									<TouchableHighlight
										onPress={() => {
											this.handleDelete(activeFile)
										}}
										style={[s.modalOption, s.renameOption]}
									>
										<Text style={{ color: 'white' }}>CONFIRM</Text>
									</TouchableHighlight>
								</View>
								<Text>This action is not reversible</Text>
							</View>
						</KeyboardAvoidingView>
					</Modal>
				</View>
		);
	}
}

mapStateToProps = (state) => {
	return {
		playing: state.toggle.playing,
		activeFile: state.activeFile,
		title: state.activeFile && state.units.files[state.activeFile].title,
	};
};

export default connect(mapStateToProps)(PlaybackControl);
