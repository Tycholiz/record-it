import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'hsla(253, 14%, 26%, 0.8)',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	icon: {
		backgroundColor: 'red',
		width: 80,
		height: 80,
		borderRadius: 80 / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 60,
	},
});

export default styles;