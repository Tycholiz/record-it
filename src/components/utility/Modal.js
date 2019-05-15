import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import s from '../../styles/FolderStructure/Folder'
import T from 'prop-types';
import { Mode, ControlView, UnitType, Modification } from '../../constants/enumerables';
import { newFolderName } from '../../utils/constants';
import { showShortDirPath } from '../../utils';

class OptionsModal extends Component {
	state = {
		unitTitle: undefined,
		modalWindowOpen: false,
	}

	render() {
		const {
			modalType,
			isVisible,
			unitType,
			unitName,
			dateCreated,
			acceptText,
			heading,
			breadcrumb,
			fullPath,
			numChildren,
			size,
			closeText,
			hasAcceptButton,
			handleCloseModal,
			acceptMethod
		} = this.props;
		return (
			<Modal
				onBackdropPress={() => this.setState({ modalWindowOpen: false })}
				isVisible={isVisible}
				style={s.modalContainer}
				avoidKeyboard={true}
			>
				<View style={[s.modalContainerInner, s.detailsModalContainerInner]}>
					{modalType === "moreInfoModal" || "renameModal" &&
						<Text style={s.modalHeader}>{heading}</Text>
					}

					{/* DELETE CONFIRMATION */}
					{/* ! this one looks like it could fail */}
					{modalType === "deleteModal" && unitType === UnitType.File ?
						<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this clip?</Text>
						:
						<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this folder and all of its contents?</Text>
					}
					{modalType === "deleteModal" &&
						<Text style={s.breadCrumb}>{breadcrumb}</Text>
					}

					{/* RENAME MODAL */}
					{modalType === "renameModal" &&
						<View style={s.textInputUnderline}>
							<TextInput
								style={s.modalInput}
								onChangeText={(newTitle) =>
									this.setState({
										unitTitle: newTitle
									})
								}
								defaultValue={unitName !== newFolderName ? unitName : ''}
								autoFocus={true}
								selectTextOnFocus={true}
								keyboardAppearance={'dark'}
								maxLength={30}
								underlineColorAndroid='transparent'
							/>
						</View>
					}

					{/* MORE INFO */}
					{modalType === "moreInfoModal" &&
						<View style={s.details}>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Full Path</Text>
								<Text style={s.lineInfo}>{fullPath}</Text>
							</View>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Date Created</Text>
								<Text style={s.lineInfo}>{dateCreated.toString()}</Text>
							</View>
							{unitType === UnitType.Folder &&
								<View style={s.lineItem}>
									<Text style={s.lineTitle}>Number of Children</Text>
									<Text style={s.lineInfo}>{numChildren}</Text>
								</View>
							}
							{unitType === UnitType.File &&
								<View>
									<View style={s.lineItem}>
										<Text style={s.lineTitle}>Duration</Text>
										<Text style={s.lineInfo}>1:22</Text>
									</View>
									<View style={s.lineItem}>
										<Text style={s.lineTitle}>File Type</Text>
										<Text style={s.lineInfo}>{unitType}</Text>
									</View>
								</View>
							}
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Size</Text>
								<Text style={s.lineInfo}>{size}</Text>
							</View>
						</View>
					}

					{/* CLOSE */}
					<View style={s.modalOptions}>
						<TouchableOpacity
							onPress={() => {
								handleCloseModal(modalType);
							}}
							style={s.modalOptions}
						>
							<Text style={[s.modalOption, s.cancelOption]}>{closeText}</Text>
						</TouchableOpacity>
					</View>

					{/* ACCEPT */}
					{hasAcceptButton &&
						<View style={s.modalOptions}>
							<TouchableOpacity
								onPress={() => {
									acceptMethod();
								}}
								style={s.modalOptions}
							>
								<Text style={s.modalOption}>{acceptText}</Text>
							</TouchableOpacity>
						</View>
					}
				</View>
			</Modal>
		);
	}
}

Modal.propTypes = {
	modalType: T.string,
	isVisible: T.bool,
	unitType: T.string,
	unitName: T.string,
	dateCreated: T.instanceOf(Date),
	acceptText: T.string,
	heading: T.string,
	breadcrumb: T.string,
	fullPath: T.string,
	numChildren: T.number,
	size: T.number,
	closeText: T.string,
	hasAcceptButton: T.string,
	handleCloseModal: T.func,
	acceptMethod: T.func,
}

export default OptionsModal;