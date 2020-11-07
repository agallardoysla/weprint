import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import {colores} from '../../../constantes/Temas';

const CartProgress = ({showProgress, progress}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={showProgress}>
      <View style={style.overlay}>
        <ActivityIndicator size={50} color={colores.logo} />
        <View style={style.textContainer}>
          <Text style={style.title}>Guardando...</Text>
        </View>

        <View style={style.textContainer}>
          <Text style={style.secondTitle}>{progress} %</Text>
        </View>
      </View>
    </Modal>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 1000,
  },
  textContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  secondTitle: {
    fontSize: 16,
  },
});

export default CartProgress;
