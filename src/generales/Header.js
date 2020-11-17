import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../assets/img/logo.svg';
import {colores} from '../constantes/Temas';

export const Header = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        elevation: 6,
        backgroundColor: colores.blanco,
      }}>
      <Logo height={80} width={80} />
    </View>
  );
};
