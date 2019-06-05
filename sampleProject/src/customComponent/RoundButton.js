/*
  @Author: Mohd Danish Khan 
  @Date: 2019-06-05 18:44:53 
 */

import React from 'react';
import { Text, TouchableOpacity, View,Image } from 'react-native';

const RoundButton = properties => (
  // <View style={{ alignItems: 'center', justifyContent: 'center' }}>
  <TouchableOpacity style={[styles.ButtonStyle, properties.style]} onPress={properties.whenPress} disabled = {properties.isDisable}>
    <Image source ={properties.children} style =
    {{width:'100%',height:'100%'}}/>
      <Text style={[styles.TextStyle, properties.textStyle]}> {properties.name} </Text>

  </TouchableOpacity>
  // </View>
);

export default RoundButton;

const styles = {
  TextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  ButtonStyle: {
    width: 20,
    height: 20,
  },
};
