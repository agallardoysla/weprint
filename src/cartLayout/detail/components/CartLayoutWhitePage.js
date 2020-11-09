import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colores, tipoDeLetra} from '../../../constantes/Temas';

const CartLayoutWhitePage = ({title}) => {
  return (
    <View style={style.mainContainer}>
      <View style={style.bgPage} />

      <View style={style.container}>
        <View style={style.banner}>
          <Text style={style.bannerText}>Pg en blanco</Text>
        </View>
      </View>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: 150,
    width: '50%',
    backgroundColor: colores.grisWrapperEmptyImage,
  },
  container: {
    position: 'absolute',
    left: 3,

    height: 105,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingBottom: 5,
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 999,
  },
  bgPage: {
    position: 'relative',
    top: 8,
    height: 100,
    width: '100%',
    paddingLeft: 5,
    paddingBottom: 5,

    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  banner: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  bannerText: {
    color: colores.gris,
    fontSize: 14,
  },
  title: {
    marginTop: 15,
    marginBottom: 30,
    color: colores.gris,
    fontWeight: '700',
    fontFamily: tipoDeLetra.bold,
    fontSize: 15,
    textAlign: 'center',
    zIndex: 10,
    elevation: 10,
  },
});

export default CartLayoutWhitePage;
