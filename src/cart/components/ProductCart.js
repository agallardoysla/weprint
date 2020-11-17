import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import has from 'lodash/has';
import GeneralImage from '../../generales/GeneralImage';

import {colores, estiloDeLetra} from '../../constantes/Temas';

const ProductCart = ({cart}) => {
  const uri = has(cart, 'pages') ? cart.pages[0].pieces[0].file : cart.file;

  return (
    <>
      <View style={style.container}>
        <View style={style.imgContainer}>
          <GeneralImage uri={uri} styleImg={style.img} />
        </View>
        <View style={style.infoContainer}>
          <Text style={style.title}>{cart.name}</Text>
          <Text style={style.description}>{cart.description}</Text>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  imgContainer: {
    flexShrink: 0,
    width: 60,
    height: 60,
    marginRight: 16,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 49,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colores.grisClaro,
  },
  title: {
    ...estiloDeLetra.negrita,
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },
});

export default ProductCart;
