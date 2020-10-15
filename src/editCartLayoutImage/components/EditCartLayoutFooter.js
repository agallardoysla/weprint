import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores, tipoDeLetra} from '../../constantes/Temas';

const EditCartLayoutFooter = () => {
  return (
    <View style={style.footerContainer}>
      <View style={style.arrowContainer}>
        <Icon name="chevron-left" size={45} color={colores.blanco} />
        <Text style={style.arrowText}>Pag 1</Text>
      </View>
      <TouchableOpacity style={style.button}>
        <Text
          style={{
            ...style.arrowText,
            fontSize: 17,
            fontWeight: '600',
          }}>
          Guardar cambios
        </Text>
      </TouchableOpacity>
      <View style={style.arrowContainer}>
        <Text style={style.arrowText}>Pag 3</Text>

        <Icon name="chevron-right" size={45} color={colores.blanco} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  footerContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colores.negro,
  },

  button: {
    paddingVertical: 5,
    paddingHorizontal: 3,
    width: 140,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: colores.logo,
    transform: [{scale: 1}],
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 18,
  },
});

export default EditCartLayoutFooter;
