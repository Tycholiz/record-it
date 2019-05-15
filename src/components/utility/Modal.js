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
		const { unitType } = this.props;
		return (
			<Modal
				onBackdropPress={() => this.setState({ modalWindowOpen: false })}
				isVisible={this.props.isVisible}
				style={s.modalContainer}
				avoidKeyboard={true}
			>
				<View style={[s.modalContainerInner, s.detailsModalContainerInner]}>
					{this.props.modalType === "moreInfoModal" || "renameModal" &&
						<Text style={s.modalHeader}>{this.props.heading}</Text>
					}

					{/* DELETE CONFIRMATION */}
					{/* ! this one looks like it could fail */}
					{this.props.modalType === "deleteModal" && unitType === UnitType.File ?
						<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this clip?</Text>
						:
						<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this folder and all of its contents?</Text>
					}
					{this.props.modalType === "deleteModal" &&
						<Text style={s.breadCrumb}>{this.props.breadcrumb}</Text>
					}

					{/* RENAME MODAL */}
					{this.props.modalType === "renameModal" &&
						<View style={s.textInputUnderline}>
							<TextInput
								style={s.modalInput}
								onChangeText={(newTitle) =>
									this.setState({
										unitTitle: newTitle
									})
								}
								// defaultValue={text !== newFolderName ? text : ''}
								autoFocus={true}
								selectTextOnFocus={true}
								keyboardAppearance={'dark'}
								maxLength={30}
								underlineColorAndroid='transparent'
							/>
						</View>
					}

					{/* MORE INFO */}
					{this.props.modalType === "moreInfoModal" &&
						<View style={s.details}>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Full Path</Text>
								{/* <Text style={s.lineInfo}>{showShortDirPath(currentRelativePath)}{text}</Text> */}
							</View>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Date Created</Text>
								{/* <Text style={s.lineInfo}>{dateCreated.toString()}</Text> */}
							</View>
							{unitType === UnitType.Folder &&
								<View style={s.lineItem}>
									<Text style={s.lineTitle}>Number of Children</Text>
									{/* <Text style={s.lineInfo}>{this.getNumChildren()}</Text> */}
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
								<Text style={s.lineInfo}>{this.props.size}</Text>
							</View>
						</View>
					}

					{/* CLOSE */}
					<View style={s.modalOptions}>
						<TouchableOpacity
							onPress={() => {
								this.props.handleCloseModal(this.props.modalType);
							}}
							style={s.modalOptions}
						>
							<Text style={[s.modalOption, s.cancelOption]}>{this.props.closeText}</Text>
						</TouchableOpacity>
					</View>

					{/* ACCEPT */}
					{this.props.hasAcceptButton &&
						<View style={s.modalOptions}>
							<TouchableOpacity
								onPress={() => {
									this.props.acceptMethod();
								}}
								style={s.modalOptions}
							>
								<Text style={s.modalOption}>{this.props.acceptText}</Text>
							</TouchableOpacity>
						</View>
					}

				</View>
			</Modal>
		);
	}
}

Modal.propTypes = {
	// modalType: T.string.isRequired,
	modalType: T.string,
	heading: T.string,
	// closeText: T.string.isRequired,
	closeText: T.string,
	hasAcceptButton: T.string,
	acceptText: T.string,
	acceptMethod: T.func,
	breadcrumb: T.string,

}

export default OptionsModal;
