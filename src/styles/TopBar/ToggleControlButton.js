import { StyleSheet } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
	container: {
		flex: 4,
		flexDirection: 'row',
		height: 80,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: colors.darkgrey,
	},
	buttonText: {
		fontWeight: '300',
		fontSize: 30,
		color: 'white',
		fontFamily: 'ubuntu'
	},
	controlViewButton: {
		flexDirection: 'column',
	},
	linearGradient: {
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 4,
		height: 10
	}
});

export default styles;