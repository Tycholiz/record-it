import { StyleSheet } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.darkgrey,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: 'darkslategrey',
	},
	namePlate: {
		flexDirection: 'row',
	},
	text: {
		marginLeft: 15,
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	clipScroll: {
		flexDirection: 'row',
		// flexWrap: 'wrap',
	},
	time: {
		borderRadius: 1,
		borderWidth: 0.5,
		margin: 15,
		padding: 3,
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