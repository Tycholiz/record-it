import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import s from '../../styles/Control/PlaybackControl';

import { startPlaying } from '../../actions/index'

// import Icon from 'react-native-vector-icons/FontAwesome';
// const starIcon = (<Icon name="star" size={30} color='gold' />)
// const trashIcon = (<Icon name="trash" size={30} color='darkslategrey' />)
// const backwardIcon = (<Icon name="fast-backward" size={30} color='darkslategrey' />)
// const forwardIcon = (<Icon name="fast-forward" size={30} color='darkslategrey' />)
// const playIcon = (<Icon name="play" size={40} color='darkslategrey' />)
// const pauseIcon = (<Icon name="pause" size={40} color='darkslategrey' />)

class PlaybackControl extends Component {
	render() {
		const { startPlaying, playing, activeFile, title } = this.props;
		return (
			<View style={s.container}>
				{/* {activeFile ? ( */}

					<View>
						<View style={s.iconContainer}>
							<TouchableOpacity>
								<Ionicons name="md-trash" size={32} color="green" />
							</TouchableOpacity>
							<TouchableOpacity>
								<Ionicons name="md-star" size={32} color="green" />
							</TouchableOpacity>
						</View>

						<Text style={s.text}>{title}.mp3</Text>

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
								<Ionicons name="ios-skip-backward" size={32} color="green" />
							</TouchableOpacity>
							<TouchableOpacity onPress={startPlaying}>
								{playing ?
									<Ionicons name="md-pause" size={32} color="green" />
										:
									<Ionicons name="md-play" size={32} color="green" />
								}
							</TouchableOpacity>
							<TouchableOpacity>
								<Ionicons name="md-fastforward" size={32} color="green" />
							</TouchableOpacity>
						</View>

					</View>
				{/* )	: (
					<View>
						<Text>Please select an audio clip</Text>
					</View>
				)} */}
				</View>
		);
	}
}

mapStateToProps = (state) => {
	return {
		playing: state.toggle.playing,
		activeFile: state.activeFile,
		title: state.units.files[state.activeFile].title,
	};
};

export default connect(mapStateToProps, { startPlaying })(PlaybackControl);
