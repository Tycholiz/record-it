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
		// borderRadius: 4,
		// flexDirection: 'column',
		// flexWrap: 'wrap',
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainerInner: {
		// flex: 1,
		backgroundColor: colors.darkgrey,
		padding: 17,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
		width: 330,
		height: 180,
		marginTop: 180,
	},
	modalHeader: {
		flex: 1,
		fontSize: 25,
		color: colors.white,
		alignSelf: 'flex-start',
		marginBottom: 10,
	},
	breadCrumb: {
		color: colors.white,
		alignSelf: 'flex-start',
		marginLeft: 10,
	},
	modalInput: {
		flex: 1,
		// fontSize: 16,
		color: colors.white
	},
	textInputUnderline: {
		flex: 1,
		borderBottomColor: colors.white,
		borderBottomWidth: StyleSheet.hairlineWidth,
		width: '100%',
	},
	modalOptions: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		marginTop: 10,
	},
	modalOption: {
		fontSize: 22,
		margin: 4,
	},
	confirmOption: {
		borderRadius: 4,
		color: colors.secondaryColor,
	},
	cancelOption: {
		borderRadius: 4,
		color: colors.primaryColor,
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