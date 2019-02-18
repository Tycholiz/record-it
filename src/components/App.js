import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	Platform,
	StatusBar,
	Image
} from 'react-native';
import { Mode } from '../constants/enumerables';

import TopBar from './TopBar';
import FolderStructure from './FolderStructure';
import Control from './Control';

class App extends Component {
	render() {
		const { mode } = this.props;
		return (
			<View style={styles.container}>
				<Image
					style={{flex: 1, position: 'absolute'}}
					source={require('../../assets/images/background.png')}
				/>
					{Platform.OS === 'ios' &&
						<StatusBar barStyle="default" />
					}
					<TopBar />
					<FolderStructure />
					{mode === Mode.Normal &&
						<Control />
					}
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		mode: state.multiple.mode
	};
}

export default connect(mapStateToProps)(App);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: 34, //todo: replace it with status bar height
		// backgroundColor: '#666666'
	},
});
