import { StyleSheet } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
	container: {
		flex: 4,
		flexDirection: 'row',
		height: 60,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: colors.darkgrey,
	},
	buttonText: {
		fontWeight: '300',
		fontSize: 30,
		color: 'white'
	},
	controlViewButton: {
		flexDirection: 'column',
	},
	toggleControlIndicator: {
		backgroundColor: 'red',
		height: 10,
		width: '80%',
		// flex: 1,
		// paddingLeft: 15,
		// paddingRight: 15,
		// borderRadius: 5
	},
	invisible: {
		backgroundColor: 'transparent',
	},
});

export default styles;