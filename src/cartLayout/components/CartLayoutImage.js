import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';

const CartLayoutImage = ({
  page,
  panResponder,
  onGoToEditCartImage,
  onDeletePage,
  onRowHeight,
}) => {
  const pageIsOdd = () => page.number % 2 !== 0;
  const handleOnPressImage = (e) => {
    e.stopPropagation();
    onGoToEditCartImage(page);
  };

  const handleOnPressDelete = () => onDeletePage(page.number);

  return (
    <>
      <View style={style.cartLayoutImageMainContainer} onLayout={onRowHeight}>
        <View style={style.cartLayoutImageBg}>
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

          <TouchableOpacity
            onPress={handleOnPressDelete}
            style={
              pageIsOdd()
                ? style.cartLayoutIconContainerXRight
                : style.cartLayoutIconContainerX
            }>
            <Icon name="x" size={15} color={colores.rojo} />
          </TouchableOpacity>
        </View>
        <Text style={style.cartLayoutText}>Pg {page.number}</Text>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  cartLayoutImageMainContainer: {
    position: 'relative',
    height: 150,
    width: '50%',
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
    height: 18,

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
    height: 18,
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
    left: -3,
    height: 18,
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
    right: 0,
    height: 18,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 4,
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
