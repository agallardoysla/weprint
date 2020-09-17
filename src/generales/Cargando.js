/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  Alert,
  BackHandler,
  Text,
} from 'react-native';
import {colores} from '../constantes/Temas';
import {RFPercentage} from 'react-native-responsive-fontsize';

const Cargando = ({
  style,
  tituloStyle,
  titulo,
  showError,
  errorStyle,
  error,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[
          {
            alignSelf: 'center',
            fontFamily: 'RobotoBold',
            fontSize: RFPercentage(3.5),
            color: colores.verCanasta,
          },
          tituloStyle,
        ]}>
        {titulo !== undefined ? titulo : '¡Bienvenido!'}
      </Text>
      <ActivityIndicator size="large" color={colores.verCanasta} />
      {showError && (
        <Text
          style={[
            {
              alignSelf: 'center',
              fontFamily: 'RobotoBold',
              fontSize: RFPercentage(1.8),
              color: colores.verCanasta,
            },
            ,
            errorStyle,
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Cargando;
