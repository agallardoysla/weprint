import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {TextInput} from 'react-native';
import styles from '../styles/styles';
import {View} from 'react-native-animatable';

const LayoutInput = ({position, style, ...attributes}) => {
  return (
    <>
      <View {...attributes} style={styles.layoutInput} />
    </>
  );
};

export default LayoutInput;
