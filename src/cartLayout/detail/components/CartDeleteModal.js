import React from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {colores, tipoDeLetra} from '../../../constantes/Temas';

const CartDeleteModal = ({showOptions, onToggleOptionsModal}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={showOptions}
      onRequestClose={onToggleOptionsModal}>
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <TouchableOpacity style={style.modelOptionItemContainer}>
            <Text
              style={{
                ...style.modelOptionItemText,
                color: colores.azulNoche,
              }}>
              Eliminar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.modelOptionItemContainer}
            onPress={onToggleOptionsModal}>
            <Text style={{...style.modelOptionItemText, color: colores.rojo}}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    marginHorizontal: '20%',
    borderRadius: 20,
    backgroundColor: colores.blanco,
    elevation: 1,
  },
  modelOptionItemContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  modelOptionItemContainerEnd: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelOptionItemText: {
    fontFamily: tipoDeLetra.regular,
    fontWeight: '500',
    fontSize: 15,
  },
});
export default CartDeleteModal;
