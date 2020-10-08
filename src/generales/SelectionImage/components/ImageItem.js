import React, {useState} from 'react';
import {Image, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Cargando from '../../Cargando';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../../constantes/Temas';

const ImagenItem = ({uri, onPressCheckImage, isCheck}) => {
  const [loading, setLoading] = useState(true);

  const handleOnLoadEndImage = () => setLoading(false);
  const handleOnPressSelectImage = () => {
    onPressCheckImage(uri, isCheck);
  };

  return (
    <TouchableWithoutFeedback
      onPress={handleOnPressSelectImage}
      disabled={loading}>
      <View style={style.imagenItemMainContainer}>
        {loading && (
          <View style={style.imagenItemLoadingContainer}>
            <Cargando titulo="" loaderColor={colores.logo} />
          </View>
        )}

        <Image
          source={{uri}}
          style={style.imagenItem}
          resizeMode="cover"
          onLoadEnd={handleOnLoadEndImage}
        />
        {isCheck || loading ? <View style={style.imagenItemOverlay} /> : null}
        {isCheck && (
          <View style={style.imagenItemCheckContainer}>
            <Icon name="check" size={27} color={colores.blanco} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  imagenItemMainContainer: {
    position: 'relative',
    marginHorizontal: 5,
    marginBottom: 10,
    maxWidth: 768,
  },
  imagenItemOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    elevation: 0,
  },
  imagenItemCheckContainer: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colores.logo,
    lineHeight: 15,
  },
  imagenItem: {
    height: 130,
    minWidth: 130,
    width: '100%',
  },
  imagenItemLoadingContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    elevation: 4,
  },
});

export default ImagenItem;
