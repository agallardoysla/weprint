/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  ImageBackground,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatedMessage = ({message}) => {
  return (
    <Animatable.View animation="bounceIn">
      <Text
        style={{
          color: 'red',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        {message}
      </Text>
    </Animatable.View>
  );
};

export default AnimatedMessage;
