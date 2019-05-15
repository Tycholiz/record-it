import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import { newFolderName } from '../../utils/constants';

class Modal extends React {
	state = {
		unitTitle: undefined,
		modalWindowOpen: false,
	}

	setMenuRef = ref => {
		this.state._menu = ref;
	};

	hideMenu = () => {
		this.state._menu.hide();
	};

	showMenu = () => {
		this.state._menu.show();
	};

	handleOpenModal = (modal) => {
		this.hideMenu()
		this.setState(() => {
			return {
				[modal]: true
			};
		});
	};

	handleCloseModal = (modal) => {
		this.setState(() => {
			return {
				[modal]: false
			};
		});
	}

	render() {
		return (
			<Modal
				onBackdropPress={() => this.setState({ modalWindowOpen: false })}
				isVisible={this.props.isVisible}
				style={s.modalContainer}
				avoidKeyboard={true}
			>
				<View style={[s.modalContainerInner, s.detailsModalContainerInner]}>
					{type === moreInfoModal || renameModal &&
						<Text style={s.modalHeader}>{this.props.heading}</Text>
					}

					{/* DELETE CONFIRMATION */}
					{/* ! this one looks like it could fail */}
					{type === deleteModal && unitType === UnitType.File ?
							<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this clip?</Text>
							:
							<Text style={[s.modalHeader, { fontSize: 20 }]}>Are you sure you want to delete this folder and all of its contents?</Text>
					}
					{type === deleteModal &&
						<Text style={s.breadCrumb}>{this.props.breadcrumb}</Text>
					}

					{/* RENAME MODAL */}
					{type === renameModal &&
						<View style={s.textInputUnderline}>
							<TextInput
								style={s.modalInput}
								onChangeText={(newTitle) =>
									this.setState({
										unitTitle: newTitle
									})
								}
								defaultValue={text !== newFolderName ? text : ''}
								autoFocus={true}
								selectTextOnFocus={true}
								keyboardAppearance={'dark'}
								maxLength={30}
								underlineColorAndroid='transparent'
							/>
						</View>
					}

					{/* MORE INFO */}
					{type === moreInfoModal &&
						<View style={s.details}>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Full Path</Text>
								<Text style={s.lineInfo}>{showShortDirPath(currentRelativePath)}{text}</Text>
							</View>
							<View style={s.lineItem}>
								<Text style={s.lineTitle}>Date Created</Text>
								<Text style={s.lineInfo}>{dateCreated.toString()}</Text>
							</View>
							{unitType === UnitType.Folder &&
								<View style={s.lineItem}>
									<Text style={s.lineTitle}>Number of Children</Text>
									<Text style={s.lineInfo}>{this.getNumChildren()}</Text>
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
								this.props.closeMethod();
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
								<Text style={[s.modalOption, s.cancelOption]}>{this.props.acceptText}</Text>
							</TouchableOpacity>
						</View>
					}

				</View>
			</Modal>
		);
	}
}

Modal.propTypes = {
	type: T.string.isRequired,
	closeText: T.string.isRequired,
	acceptText: T.string,
	hasAcceptButton: T.string,
	closeMethod: T.func.isRequired,
	acceptMethod: T.func,
	heading: T.string,
	breadcrumb: T.string,

}
