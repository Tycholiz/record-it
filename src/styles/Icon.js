// import { createIconSetFromIcoMoon } from '@expo/vector-icons';
// import icoMoonConfig from '../../selection.json';
//
// export default createIconSetFromIcoMoon(icoMoonConfig);

//todo: use react-native-vector-icons here and return proper vector icon.

import React, {Component} from 'react'
import {View} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'

export default class Icon extends Component {
    render(){
        return(
            <View style={{marginTop: 15, width: 45, height: 35, backgroundColor: 'yellow'}}/>
        )
    }
}
