import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 4,
		flexDirection: 'row',
		height: 60,
		alignItems: 'center',
		justifyContent: 'space-around',
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
		// backgroundColor: 'red',
		// height: 10,
		// width: '80%',
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},
});

export default styles;