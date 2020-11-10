import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {colores} from '../constantes/Temas';

const CargandoOverlay = () => {
  return (
    <View style={style.overlay}>
      <ActivityIndicator size="large" color={colores.logo} />
    </View>
  );
};

const style = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    zIndex: 999,
    elevation: 999,
  },
});

export default CargandoOverlay;
