import { StyleSheet } from 'react-native';

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
	selectMultipleTopBar: {
		position: 'absolute',
		top: -125,
		right: 0,
		bottom: 0,
		left: 0,
		height: 80,
		flexDirection: 'row',
		backgroundColor: 'dimgrey'
	},
	confirmButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'green',
	},
	moveButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
	},
	deleteButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'tomato',
	},
	cancelButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'grey',
	},
	unitIcon: {
		width: 50,
		height: 40,
		marginTop: 10,
	},
});

export default styles;