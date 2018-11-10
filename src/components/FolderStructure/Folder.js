import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	TextInput,
	Modal,
	TouchableHighlight,
	Alert,
	KeyboardAvoidingView,
} from 'react-native';

import { deleteUnit, renameUnit } from '../../actions';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Icon from 'react-native-vector-icons/FontAwesome';
const barsIcon = (<Icon name="bars" size={30} color='black' />)

class Folder extends Component {
	state = {
		_menu: null,
		renaming: false,
		title: '',
	};

	setMenuRef = ref => {
		this.state._menu = ref;
	};

	hideMenu = () => {
		this.state._menu.hide();
	};

	showMenu = () => {
		this.state._menu.show();
	};

	handleDelete = (unitId, unitType) => {
		const { dispatch } = this.props;
		this.hideMenu()
		dispatch(deleteUnit(unitId, unitType));
	};

	handleRenamePrompt = () => {
		this.hideMenu()
		this.setState(() => {
			return {
				renaming: true
			};
		});
	};

	handleCloseModal = () => {
		this.setState(() => {
			return {
				renaming: false
			};
		});
	}

	handleRename = (unitId, unitType) => {
		const { dispatch } = this.props;
		const { title } = this.state;
		this.handleCloseModal();
		title ? dispatch(renameUnit(unitId, unitType, title)) : null
	}

	render() {
		const { renaming } = this.state;
		const { text, icon, onPress, unitType, id } = this.props;
		return (
			<TouchableOpacity style={styles.container} onPress={onPress}>

				{unitType &&
					<TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={this.showMenu}>
						<Menu
							ref={this.setMenuRef}
							button={barsIcon}
						>
						<MenuItem onPress={() => this.handleRenamePrompt(id, unitType, text)}>Rename</MenuItem>
							<MenuDivider />
							<MenuItem onPress={() => this.handleDelete(id, unitType)}>Delete</MenuItem>
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Favorite</MenuItem>
							{unitType === 'file' &&
								<View>
									<MenuDivider />
									<MenuItem onPress={this.hideMenu}>Share</MenuItem>
								</View>
							}
							<MenuDivider />
							<MenuItem onPress={this.hideMenu}>Close</MenuItem>
						</Menu>
					</TouchableOpacity>
				}

				<Modal
					animationType="slide"
					transparent={true}
					visible={renaming}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>
					<KeyboardAvoidingView style={styles.modalMask} behavior="padding">
						<View style={styles.modalContainer}>
							{unitType === 'file' ?
								<Text style={styles.modalHeader}>Rename clip:</Text>
									:
								<Text style={styles.modalHeader}>Rename folder:</Text>
							}

							<TextInput
								style={styles.modalInput}
								onChangeText={(newTitle) => this.setState({title: newTitle})}
								defaultValue={'tits'}
								autoFocus={true}
								selectTextOnFocus={true}
								keyboardAppearance={'dark'}
								maxLength={30}
							/>

							<View style={styles.modalOptions}>
								<TouchableHighlight
									onPress={() => {
										this.handleCloseModal();
									}}
									style={styles.modalOption}
								>
									<Text>CANCEL</Text>
								</TouchableHighlight>

								<TouchableHighlight
									onPress={() => {
										this.handleRename(id, unitType)}
									}
									style={[styles.modalOption, styles.renameOption]}
								>
									<Text style={{color: 'white'}}>RENAME</Text>
								</TouchableHighlight>
							</View>

						</View>
					</KeyboardAvoidingView>
				</Modal>

				{icon}
				<Text icon={icon}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentFolder: state.currentFolder,
		units: state.units,
	};
}

export default connect(mapStateToProps)(Folder);

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
	modalMask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	modalContainer: {
		flex: 1,
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginHorizontal: 43,
		marginTop: 240,
		marginBottom: 240,
		borderRadius: 4,
		backgroundColor: '#2B2B2B',
		zIndex: 1
	},
	modalHeader: {
		flex: 1,
		fontSize: 25
	},
	modalinput: {
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
		backgroundColor: 'teal',
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
