import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import GeneralImage from '../../GeneralImage';
import {estiloDeLetra, tipoDeLetra, colores} from '../../../constantes/Temas';

const AlbumItem = ({album, onPressSelectAlbum}) => {
  const handleOnPress = () => onPressSelectAlbum(album.title);

  return (
    <TouchableOpacity
      style={{
        ...style.albumContainer,
        width: useWindowDimensions().width / 2 - 15,
      }}
      onPress={handleOnPress}>
      <View
        style={{
          ...style.albumImageContainer,
          height: useWindowDimensions().width / 2 - 15 + 9,
        }}>
        <GeneralImage uri={album.firstImage} styleImg={style.albumImage} />
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
    marginHorizontal: 7,
    marginBottom: 20,
  },
  albumImageContainer: {
    position: 'relative',
    width: '100%',
  },
  albumImage: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  albumTitle: {
    marginTop: 6,
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
  albumLoadingContainer: {
    position: 'relative',
  },
});

export default AlbumItem;
