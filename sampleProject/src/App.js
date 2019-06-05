/*
  @Author: Mohd Danish Khan 
  @Date: 2019-06-05 18:44:53 
 */

import React, {Component} from 'react';
import { StyleSheet, Text, PanResponder, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import RoundButton from './customComponent/RoundButton';

let shoppingList = require('../resources/assets/shoppingList.png');
let shopping = require('../resources/assets/shopping.png');
let barcode = require('../resources/assets/barcode.png');

let sale = require('../resources/assets/sale.png');
let location = require('../resources/assets/location.png');
let payment = require('../resources/assets/payment.png');



const MAX_POINTS = 2500;

export default class App extends React.Component {
  state = {
    isMoving: false,
    pointsDelta: 0,
    points: 325,
  };
  
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ isMoving: true, pointsDelta: 0 });
      },

      onPanResponderMove: (evt, gestureState) => {
        this.refs.circularProgress.animate(0, 0);
        // For each 2 pixels add or subtract 1 point
        this.setState({ pointsDelta: Math.round(-gestureState.dy / 2) });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.refs.circularProgress.animate(100, 3000);
        let points = this.state.points + this.state.pointsDelta;
        console.log(Math.min(points, MAX_POINTS));
        this.setState({
          isMoving: false,
          points: points > 0 ? Math.min(points, MAX_POINTS) : 0,
          pointsDelta: 0,
        });
      },
    });
  }

  render() {
    const fill = (this.state.points / MAX_POINTS) * 100;

    return (
      
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <View style={{alignItems: 'center',}}> 
          <AnimatedCircularProgress
            size={200}
            width={20}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            ref="circularProgress"
          >
            {fill => <Text style={styles.points}>{"$"+  Math.round((MAX_POINTS * fill) / 100) }</Text>}
          </AnimatedCircularProgress>
          <Text style={{fontSize: 16, color: 'white', marginTop: 10}}>Expense Limit</Text>
        </View>

        <View style={{flexDirection: 'column', flex: 0.5,  marginLeft: 10, marginRight: 10}}>
          <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between', marginBottom: 40}}>
            <RoundButton style={{width: '25%', height: '100%' }} name={"Shopping"}>{shopping}</RoundButton>
            <RoundButton style={{width: '25%', height: '100%' }} name={"List"}>{shoppingList}</RoundButton>
            <RoundButton style={{width: '25%', height: '100%'}} name={"Barcode"}>{barcode}</RoundButton>
          </View>
          <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between', marginBottom: 40}}>
            <RoundButton style={{width: '25%', height: '100%' }} name={"Payment"}>{payment}</RoundButton>
            <RoundButton style={{width: '25%', height: '100%' }} name={"Sale"}>{sale}</RoundButton>
            <RoundButton style={{width: '25%', height: '100%' }} name={"Location"}>{location}</RoundButton>
          </View>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  points: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#152d44',
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: '100',
  },
  pointsDeltaActive: {
    color: '#fff',
  },
});