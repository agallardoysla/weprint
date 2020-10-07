import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Cargando from '../../generales/Cargando';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../constantes/Temas';

const ImagenItem = ({uri, onPressCheckImage}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [base64Cache, setBase64Cache] = useState('');

  const handleOnLoadEndImage = () => setLoading(false);

  const getBase64 = async () => {
    try {
      if (base64Cache) {
        return base64Cache;
      }

      const base64Str = await RNFetchBlob.fs.readFile(uri, 'base64');
      setBase64Cache(base64Str);

      return base64Str;
    } catch (error) {
      throw new Error('Error');
    }
  };

  const handleIsCheck = async () => {
    setLoading(true);

    try {
      const checkState = !isCheck;
      const base64Str = checkState ? await getBase64() : null;

      setIsCheck(checkState);
      setLoading(false);
      onPressCheckImage(uri, checkState, base64Str);
    } catch {
      setLoading(false);
      Alert.alert('Ha ocurrido un error vuelve a intentarlo');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleIsCheck} disabled={loading}>
      <View style={style.imagenItemMainContainer}>
        {loading && (
          <View style={style.imagenItemLoadingContainer}>
            <Cargando titulo="" />
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
