import React from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import GeneralImage from '../../generales/GeneralImage';
import {colores, tipoDeLetra} from '../../constantes/Temas';

const CartLayoutCover = ({piece, onHeaderHeight}) => {
  const widthCover = Math.floor((useWindowDimensions().width * 60) / 100);

  return (
    <View style={style.cartLayoutCoverMainContainer} onLayout={onHeaderHeight}>
      <View
        style={{
          ...style.cartLayoutCoverContainerBg,
          width: widthCover,
        }}>
        <View
          style={{
            ...style.cartLayoutConverContainer,
            width: widthCover - 6,
          }}>
          <GeneralImage
            base64={piece ? piece.file.base64 : null}
            uri={piece ? piece.file.uri : null}
            styleImg={style.cartLayoutImage}
          />
        </View>
      </View>
      <Text style={style.cartLayoutCovertText}>Portada</Text>
    </View>
  );
};

const style = StyleSheet.create({
  cartLayoutCoverMainContainer: {
    alignItems: 'center',
  },
  cartLayoutCoverContainerBg: {
    position: 'relative',
    height: 150,
    borderWidth: 1,
    borderColor: colores.grisFormatoAlbum,
    backgroundColor: colores.blanco,
  },
  cartLayoutConverContainer: {
    position: 'absolute',
    bottom: 3,
    height: 150,
    borderWidth: 1,
    borderColor: colores.grisFormatoAlbum,
  },
  cartLayoutImage: {
    height: '100%',
    width: '100%',
  },
  cartLayoutCovertText: {
    marginTop: 5,
    marginBottom: 30,
    color: colores.gris,
    fontWeight: '700',
    fontFamily: tipoDeLetra.bold,
    fontSize: 16,
  },
});
export default CartLayoutCover;
