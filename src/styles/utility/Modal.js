import { StyleSheet } from 'react-native';

import colors from '../colors'

const styles = StyleSheet.create({
	modalContainer: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainerInner: {
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
		// flex: 1,
		fontSize: 25,
		color: colors.white,
		alignSelf: 'center',
		marginBottom: 10,
		padding: 0,
	},
	modalMask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
		color: colors.secondaryColor,
	},
	cancelOption: {
		color: colors.primaryColor,
	},
	detailsModalContainerInner: {
		height: 350,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	details: {
		flex: 1,
	},
	lineItem: {
		alignSelf: 'flex-start',
		marginVertical: 5,
	},
	lineTitle: {
		color: colors.white,
		fontSize: 16,
		fontWeight: 'bold'
	},
	lineInfo: {
		color: colors.white,
		marginLeft: 15,
	}
});

export default styles;