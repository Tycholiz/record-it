import { StyleSheet } from 'react-native';

import colors from '../colors'

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 80,
		borderRadius: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-end',
		margin: 6,
	},
	containerSelected: {
		backgroundColor: 'teal'
	},
	containerMultipleMode: {
		borderWidth: 1,
		borderColor: 'red',
	},
	folderOptionsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalMask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	modalContainer: {
		flex: 0,
		width: 330,
		height: 150,
		backgroundColor: '#2B2B2B',
		// marginHorizontal: 40,
		// justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 4,
		// flexDirection: 'column',
		// flexWrap: 'wrap',
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainerInner: {
		// flex: 1,
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	modalHeader: {
		flex: 1,
		fontSize: 25
	},
	modalInput: {
		flex: 1,
	},
	modalOptions: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	modalOption: {
	},
	renameOption: {
		borderRadius: 4,
		backgroundColor: 'red',
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