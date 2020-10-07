import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';

const CartLayoutImage = ({page, onGoToEditCartImage}) => {
  const pageIsOdd = () => page.number % 2 === 0;

  const handleOnPressImage = () => onGoToEditCartImage(page);

  return (
    <View style={style.cartLayoutImageMainContainer}>
      <View style={style.cartLayoutImageBg}>
        <View
          style={
            pageIsOdd()
              ? style.cartLayoutIconContainerXRight
              : style.cartLayoutIconContainerX
          }>
          <Icon name="x" size={15} color={colores.rojo} />
        </View>
        <View style={style.cartLayoutImageContainer}>
          <TouchableOpacity onPress={handleOnPressImage}>
            <Image
              source={{uri: `data:image/gif;base64,${page.pieces[0].file}`}}
              style={style.cartLayoutImageSize}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View
          style={
            pageIsOdd()
              ? style.cartLayoutIconContainerRight
              : style.cartLayoutIconContainer
          }>
          <Icon name="move" size={15} color={colores.gris} />
        </View>

        <View
          style={
            pageIsOdd()
              ? style.cartLayoutIconContainerPlusRight
              : style.cartLayoutIconContainerPlus
          }>
          <Icon name="plus" size={15} color="green" />
        </View>
      </View>
      <Text style={style.cartLayoutText}>Pg {page.number}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  cartLayoutImageMainContainer: {
    position: 'relative',
    height: 150,
    flexGrow: 1,
    maxWidth: 768,
  },
  cartLayoutImageBg: {
    height: 110,
    width: '100%',
    paddingLeft: 5,
    paddingBottom: 5,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  cartLayoutImageContainer: {
    flexGrow: 0.5,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  cartLayoutImageSize: {
    width: 91,
    height: 100,
  },
  cartLayoutIconContainer: {
    position: 'absolute',
    top: 100,
    left: -5,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 1,
  },
  cartLayoutIconContainerRight: {
    position: 'absolute',
    top: 100,
    right: -3,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 4,
  },
  cartLayoutIconContainerX: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 4,
  },
  cartLayoutIconContainerXRight: {
    position: 'absolute',
    top: -5,
    right: -3,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 4,
  },
  cartLayoutIconContainerPlusRight: {
    position: 'absolute',
    bottom: -5,
    left: -9,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 1,
  },

  cartLayoutIconContainerPlus: {
    position: 'absolute',
    bottom: -5,
    right: -14,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },

  cartLayoutText: {
    marginTop: 5,
    marginBottom: 30,
    color: colores.gris,
    fontWeight: '700',
    fontFamily: tipoDeLetra.bold,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CartLayoutImage;
