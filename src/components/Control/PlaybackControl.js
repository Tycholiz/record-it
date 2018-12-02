import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
import s from '../../styles/Control/PlaybackControl';

import { startPlaying } from '../../actions/index'

class PlaybackControl extends Component {
	render() {
		const { startPlaying, playing, activeFile, title } = this.props;
		return (
			<View style={s.container}>
				{/* {activeFile ? ( */}

					<View>
						<View style={s.topLine}>
							<Text style={s.text}>{title}.mp3</Text>
							<View style={s.iconContainer}>
								<TouchableOpacity>
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
							<TouchableOpacity onPress={startPlaying}>
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
