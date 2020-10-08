import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import Cargando from '../../Cargando';
import {estiloDeLetra, tipoDeLetra, colores} from '../../../constantes/Temas';

const AlbumItem = ({album, getPhotosByAlbumFromPhone, onPressSelectAlbum}) => {
  const [loading, setLoading] = useState(true);
  const [placeHolderImg, setPlaceHolderImg] = useState('');

  const handleGetImage = useCallback(async () => {
    const response = await getPhotosByAlbumFromPhone(1, album.title);
    setPlaceHolderImg(response.edges[0].node.image.uri);
  }, [setPlaceHolderImg]);

  const handleOnPress = () => {
    if (!loading) {
      onPressSelectAlbum(album.title);
    }
  };

  const handleOnLoadSuccess = () => setLoading(false);

  useEffect(() => {
    handleGetImage();
  }, [handleGetImage]);

  return (
    <TouchableOpacity style={style.albumContainer} onPress={handleOnPress}>
      <View style={style.albumImageContainer}>
        {loading && (
          <View style={style.albumLoaderContainer}>
            <Cargando titulo="" loaderColor={colores.logo} />
          </View>
        )}

        {!isEmpty(placeHolderImg) && (
          <Image
            style={style.albumImage}
            resizeMode="cover"
            onLoadEnd={handleOnLoadSuccess}
            source={{
              uri: placeHolderImg,
            }}
          />
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
    marginHorizontal: 10,
    marginBottom: 10,
    flexGrow: 1,
    maxWidth: 768,
  },
  albumImageContainer: {
    height: 160,
    minWidth: 168,
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  albumTitle: {
    marginTop: 12,
    fontSize: 20,
    ...estiloDeLetra.negrita,
  },
  albumCount: {
    marginVertical: 8,
    color: colores.gris,
    fontSize: 16,
    fontFamily: tipoDeLetra.regular,
  },
  albumLoaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    elevation: 0,
    height: 160,
    justifyContent: 'center',
  },
});

export default AlbumItem;
