import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {colores, tipoDeLetra} from '../../../constantes/Temas';

const CartDeleteItemModal = ({showModal, onPressDelete, onToggleModal}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={showModal}>
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>¿Eliminar el artículo?</Text>
          <Text style={style.modalSecondTitle}>
            ¿Estás seguro que quieres eliminar esto?
          </Text>

          <View style={style.modalOptionsContainer}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={onToggleModal}
              style={{
                ...style.modalOptionItem,
                borderRightWidth: 0.5,
                borderRightColor: colores.grisFormatoAlbum,
                borderBottomLeftRadius: 5,
              }}>
              <Text style={{color: colores.azulMedio}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              delayPressIn={0}
              style={{...style.modalOptionItem, borderBottomRightRadius: 5}}
              onPress={onPressDelete}>
              <Text style={{color: colores.rojo}}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CartDeleteItemModal;

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
    borderRadius: 5,
    backgroundColor: colores.blanco,
    elevation: 1,
  },
  modalTitle: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSecondTitle: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: tipoDeLetra.regular,
    textAlign: 'center',
  },
  modalOptionsContainer: {
    flexDirection: 'row',
    marginTop: 18,
    borderTopColor: colores.grisFormatoAlbum,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 0.5,
  },
  modalOptionItem: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blanco,
  },
});
