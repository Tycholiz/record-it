// import { createIconSetFromIcoMoon } from '@expo/vector-icons';
// import icoMoonConfig from '../../selection.json';
//
// export default createIconSetFromIcoMoon(icoMoonConfig);

//todo: use react-native-vector-icons here and return proper vector icon.

import React, {Component} from 'react'
import {View} from "react-native";

export default class Icon extends Component {
    render(){
        return(
            <View style={{width: 20, height: 20, backgroundColor: 'yellow'}}/>
        )
    }
}
