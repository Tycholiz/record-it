import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	Platform,
	StatusBar,
} from 'react-native';
import T from 'prop-types'
import { Mode } from '../constants/enumerables';
import RadialGradient from 'react-native-radial-gradient';

import TopBar from './TopBar';
import FolderStructure from './FolderStructure';
import Control from './Control';

class App extends Component {
	render() {
		const { mode } = this.props;
		return (
			<View style={styles.container}>
				<RadialGradient
					style={{ flex: 1 }}
					colors={[
						'hsla(0, 0%, 80%, 1)',
						'hsla(0, 0%, 15%, 1)',
					]}
					radius={250}>
					{Platform.OS === 'ios' &&
						<StatusBar barStyle="default" />
					}
					<TopBar />
					<FolderStructure />
					{mode === Mode.Normal &&
						<Control />
					}
				</RadialGradient>
			</View>
		);
	}
}

App.propTypes = {
	mode: T.string.isRequired
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
	},
});
