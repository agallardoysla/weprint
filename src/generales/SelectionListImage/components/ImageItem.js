import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Cargando from '../../Cargando';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../../constantes/Temas';

const ImagenItem = ({uri, onPressCheckImage, isSelected}) => {
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(isSelected);

  const handleOnLoadEndImage = () => setLoading(false);
  const handleOnPressSelectImage = () => {
    const isCheck = !check;

    onPressCheckImage(uri, isCheck);
    setCheck(isCheck);
  };

  useEffect(() => {
    setCheck(isSelected);
  }, [isSelected, setCheck]);

  return (
    <TouchableWithoutFeedback
      onPress={handleOnPressSelectImage}
      disabled={loading}>
      <View
        style={{
          ...style.imagenItemMainContainer,
          width: useWindowDimensions().width / 3 - 8,
        }}>
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
        {check || loading ? <View style={style.imagenItemOverlay} /> : null}
        {check && (
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
    height: 130,
    marginHorizontal: 4,
    marginBottom: 10,
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
    height: '100%',
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
