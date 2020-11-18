import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colores} from '../constantes/Temas';

const ButtonReload = ({onReload}) => (
  <View style={style.mainContainer}>
    <View style={style.textContainer}>
      <Text style={style.text}>
        Ha ocurrido un error, revisa tu conexión y vuelve a intentarlo
      </Text>
    </View>
    <TouchableOpacity style={style.button} onPress={onReload}>
      <Text style={style.buttonText}>Volver a intentar</Text>
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  textContainer: {
    maxWidth: 250,
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    width: '50%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: colores.blanco,
  },
  buttonText: {
    color: colores.logo,
    textAlign: 'center',
  },
});

export default ButtonReload;
