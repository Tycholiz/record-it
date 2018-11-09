import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const optionsIcon = (<Icon name="ellipsis-v" size={30} color='black' />)

export default class Folder extends Component {
	render() {
		const { text, icon, onPress } = this.props;
		return (
			<TouchableOpacity style={styles.container} onPress={onPress}>
				<TouchableOpacity style={styles.optionsIcon}>
					{optionsIcon}
				</TouchableOpacity>
				{icon}
				<Text icon={icon}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 80,
		borderRadius: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-end',
		margin: 6,
	},
	icon: {
		justifyContent: 'center',
	},
	optionsIcon: {
		alignSelf: 'flex-end',
		marginRight: 20,
		marginTop: 40,
	},
});
