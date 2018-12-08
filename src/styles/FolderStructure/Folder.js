import { StyleSheet } from 'react-native';

import colors from '../colors'

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.unitColor,
		alignItems: 'center',
		justifyContent: 'flex-start',
		margin: 6,
		borderWidth: 2,
		borderColor: colors.unitColor,
	},
	navContainer: {
		width: 140,
		height: 80,
		borderRadius: 30,
	},
	fileContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	folderContainer: {
		width: 100,
		height: 100,
		borderRadius: 38,
	},
	containerMultipleMode: {
		borderWidth: 2,
		borderColor: colors.white,
	},
	containerSelected: {
		backgroundColor: colors.tertiaryColor,
		borderColor: colors.tertiaryColor,
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
		// width: 330,
		// height: 150,
		// backgroundColor: '#2B2B2B',
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
		width: 330,
		height: 150,
		marginTop: 200,
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