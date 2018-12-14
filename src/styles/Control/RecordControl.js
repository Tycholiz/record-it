import { StyleSheet } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: colors.darkgrey,
	},
	containerInner: {
		height: '75%',
		justifyContent: 'center',
		alignItems: 'flex-end',
		flexDirection: 'row',
		marginBottom: 20,
	},
	microphoneContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	timeElapsed: {
		textAlign: 'center',
		fontSize: 24,
		color: colors.white,
		marginBottom: 10
	},
	iconCancelAccept: {
		marginBottom: 15,
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 60,
	},
});

export default styles;