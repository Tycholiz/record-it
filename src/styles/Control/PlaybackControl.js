import { StyleSheet } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.darkgrey,
	},
	topLine: {
		flexDirection: 'row',
	},
	text: {
		marginTop: 5,
		marginLeft: 15,
		flex: 1,
		color: colors.white
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	clipScroll: {
		flexDirection: 'row',
	},
	time: {
		borderRadius: 1,
		borderWidth: 0.5,
		margin: 10,
		padding: 3,
		color: colors.white
	},
	scroller: {
		borderWidth: 0,
	},
	clipNavigation: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});

export default styles;