import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import Cargando from '../../Cargando';
import GeneralImage from '../../GeneralImage';
import {estiloDeLetra, tipoDeLetra, colores} from '../../../constantes/Temas';

const AlbumItem = ({album, getPhotosByAlbumFromPhone, onPressSelectAlbum}) => {
  const [placeHolderImg, setPlaceHolderImg] = useState('');

  const handleGetImage = useCallback(async () => {
    const response = await getPhotosByAlbumFromPhone(1, album.title);
    setPlaceHolderImg(response.edges[0].node.image.uri);
  }, [setPlaceHolderImg]);

  const handleOnPress = () => onPressSelectAlbum(album.title);

  useEffect(() => {
    handleGetImage();
  }, [handleGetImage]);

  return (
    <TouchableOpacity
      style={{
        ...style.albumContainer,
        width: useWindowDimensions().width / 2 - 10,
      }}
      onPress={handleOnPress}>
      <View
        style={{
          ...style.albumImageContainer,
          height: useWindowDimensions().width / 2 - 10,
        }}>
        {!isEmpty(placeHolderImg) && (
          <GeneralImage styleImg={style.albumImage} uri={placeHolderImg} />
        )}
      </View>
      <View>
        <Text style={style.albumTitle}>{album.title}</Text>
        <Text style={style.albumCount}>{album.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  albumContainer: {
    //width: '50%',
    /*marginHorizontal: 5,*/
    //width: Dimensions.get('window').width / 2 - 20,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  albumImageContainer: {
    /*borderWidth: 2,
    borderColor: colores.blanco,*/
    width: '100%',
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  albumTitle: {
    marginTop: 10,
    fontSize: 16,
    ...estiloDeLetra.negrita,
    color: colores.azulNoche,
  },
  albumCount: {
    marginTop: 4,
    color: colores.gris,
    fontSize: 14,
    fontFamily: tipoDeLetra.regular,
  },
});

export default AlbumItem;
