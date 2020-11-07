import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {colores, tipoDeLetra} from '../../../constantes/Temas';

const CartButton = ({cart, hasLocalChange, loading, onHandleSaveImages}) => {
  const renderText = () =>
    hasLocalChange ? 'Guardar Cambios' : 'Guardar Borrador';

  const renderButtonSave = () => hasLocalChange || (cart && !cart.user_id);

  const opacityStyles = {
    opacity: loading ? 0.8 : 1,
  };

  if (renderButtonSave()) {
    return (
      <TouchableOpacity
        style={[style.button, opacityStyles]}
        onPress={onHandleSaveImages}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colores.blanco} />
        ) : (
          <Text style={style.buttonText}>{renderText()}</Text>
        )}

        {loading && <View style={style.overlay} />}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={style.button}
        onPress={() => {}}
        disabled={loading}>
        <Text style={style.buttonText}>Comprar</Text>
      </TouchableOpacity>
    );
  }
};

export default CartButton;

const style = StyleSheet.create({
  button: {
    width: '40%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colores.logo,
  },
  buttonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
