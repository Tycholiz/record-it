import { StyleSheet } from 'react-native';

import colors from '../colors'

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		margin: 6,
		borderWidth: 2,
		borderColor: colors.unitColor,
		borderRadius: 30,
		overflow: 'hidden'
	},
	navContainer: {
		width: 140,
		height: 80,
		borderRadius: 30,
	},
	fileContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	folderContainer: {
		width: 100,
		height: 100,
		borderRadius: 38,
	},
	unitTitleText: {
		textAlign: 'center',
		fontFamily: 'Ubuntu-Regular'
	},
	containerMultipleMode: {
		borderWidth: 2,
		borderColor: colors.white,
	},
	containerSelected: {
		backgroundColor: colors.tertiaryColor,
		borderColor: colors.tertiaryColor,
	},
	folderOptionsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		justifyContent: 'center',
	},
	barsIcon: {
		alignSelf: 'flex-end',
		marginRight: 20,
		marginTop: 80,
	},
});

export default styles;