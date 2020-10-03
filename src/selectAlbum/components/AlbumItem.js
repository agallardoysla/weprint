import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Cargando from '../../generales/Cargando';
import {estiloDeLetra, tipoDeLetra, colores} from '../../constantes/Temas';

const AlbumItem = ({
  album,
  getPhotosByAlbumFromPhone,
  onPressGoToSelectImagen,
}) => {
  const [loading, setLoading] = useState(true);
  const [placeHolderImg, setPlaceHolderImg] = useState('');

  const handleGetImage = useCallback(async () => {
    const response = await getPhotosByAlbumFromPhone(1, album.title);
    setPlaceHolderImg(response.edges[0].node.image.uri);
    setLoading(false);
  }, [setPlaceHolderImg]);

  useEffect(() => {
    handleGetImage();
  }, [handleGetImage]);

  const handleOnPress = () => onPressGoToSelectImagen(album.title);

  return (
    <TouchableOpacity style={style.albumContainer} onPress={handleOnPress}>
      <View style={style.albumImageContainer}>
        {loading ? (
          <View style={style.albumLoaderContainer}>
            <Cargando titulo="Cargando..." />
          </View>
        ) : (
          <Image
            style={style.albumImage}
            resizeMode="cover"
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
    width: 180,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  albumImageContainer: {
    height: 160,
    width: '100%',
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
    height: 160,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default AlbumItem;
