import React from 'react';
import { StyleSheet, View } from 'react-native';
import styles from '../styles/styles'

function CardLogin(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
}

export default CardLogin

