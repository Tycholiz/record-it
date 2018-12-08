import { StyleSheet } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		flexGrow: 1,
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
	},
	navButtonWrapper: {
		flexDirection: 'row',
		marginVertical: 3,
		height: 40,
	},
	navButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 4,
		borderRadius: 5,
		backgroundColor: colors.darkgrey,
	},
	navButtonText: {
		fontWeight: 'bold',
		fontSize: 20
	},
	upOneLevel: {
		color: colors.tertiaryColor
	},
	newFolder: {
		color: colors.secondaryColor,
	},
	selectMultipleTopBar: {
		position: 'absolute',
		top: -125,
		right: 0,
		bottom: 0,
		left: 0,
		height: 80,
		backgroundColor: colors.darkgrey
	},
	containerMultipleButtonRow: {
		flex: 1.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	selectMultipleUnitButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		margin: 3,
	},
	selectMultipleText: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 23,
		textShadowColor: 'rgba(0, 0, 0, 0.65)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 8
	},
	unitIcon: {
		width: 50,
		height: 40,
		marginTop: 10,
	},
});

export default styles;