import React, {useEffect, useState, useCallback} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import AlbumItem from './AlbumItem';
import Cargando from '../../Cargando';

const AlbumList = ({
  onPressGoToBack,
  onPressSelectAlbum,
  minQuantity,
  selectedImages,
}) => {
  const [albums, setAlbums] = useState([]);
  const [storage, setStorage] = useState('device');
  const [loading, setLoading] = useState(true);

  const hasAndroidPermission = useCallback(async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }, []);

  const getAlbumsFromPhone = useCallback(async () => {
    if (Platform.OS === 'android' && (await hasAndroidPermission())) {
      const albumsFromPhone = await CameraRoll.getAlbums({assetType: 'Photos'});
      const albumsFormat = await Promise.all(
        albumsFromPhone.map(async (album) => {
          const response = await getPhotosByAlbumFromPhone(1, album.title);

          return {
            ...album,
            firstImage: response.edges[0].node.image.uri,
          };
        }),
      );

      setAlbums(albumsFormat);
      setLoading(false);
    }
  }, [hasAndroidPermission, setAlbums, setLoading]);

  const getPhotosByAlbumFromPhone = useCallback(async (number, groupName) => {
    const photos = await CameraRoll.getPhotos({
      assetType: 'Photos',
      first: number,
      groupName,
      include: ['filename', 'location'],
    });

    return photos;
  }, []);

  useEffect(() => {
    getAlbumsFromPhone();
  }, [getAlbumsFromPhone]);

  const renderAlbums = ({item: album}) => (
    <AlbumItem album={album} onPressSelectAlbum={onPressSelectAlbum} />
  );

  const handlePressGotoBack = () => {
    if (!loading) {
      onPressGoToBack();
    }
  };

  const isSelectedStorage = (storageSelected) => storageSelected === storage;

  const getColor = (storageSelected) =>
    isSelectedStorage(storageSelected) ? colores.logo : colores.grisClaro;

  return (
    <View style={style.albumListMainContainer}>
      <TouchableOpacity
        style={style.albumListHeader}
        onPress={handlePressGotoBack}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
        <View style={style.albumListHeaderTextContainer}>
          <View>
            <Text style={style.albumListHeaderText}>Álbumes</Text>
          </View>
          {selectedImages.length > 0 && (
            <View>
              <Text style={style.albumListHeaderText}>
                {selectedImages.length}/{minQuantity}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {loading && <Cargando titulo=" " loaderColor={colores.logo} />}
      {!loading && albums.length && (
        <View style={style.albumListAlbumContainer}>
          <FlatList
            contentContainerStyle={style.albumListContent}
            data={albums}
            numColumns={2}
            renderItem={renderAlbums}
            keyExtractor={(album) => album.title}
          />
        </View>
      )}
      {!loading && !albums.length && (
        <View style={style.albumListMessageContainer}>
          <Text style={style.albumListMessage}>
            No se pudo acceder a álbumes
          </Text>
        </View>
      )}
      <View style={style.albumListIconContainer}>
        <TouchableOpacity style={style.albumListSocialIconItem}>
          <Icon name="smartphone" size={25} color={getColor('device')} />
          <Text
            style={{
              ...style.albumListSocialIconText,
              color: getColor('device'),
            }}>
            Dispositivo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.albumListSocialIconItem}>
          <Icon name="facebook" size={25} color={getColor('facebook')} />
          <Text
            style={{
              ...style.albumListSocialIconText,
              color: getColor('facebook'),
            }}>
            Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.albumListSocialIconItem}>
          <Icon name="instagram" size={25} color={getColor('instagram')} />
          <Text
            style={{
              ...style.albumListSocialIconText,
              color: getColor('instagram'),
            }}>
            instagram
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.albumListSocialIconItem}>
          <Icon name="package" size={25} color={getColor('package')} />
          <Text
            style={{
              ...style.albumListSocialIconText,
              color: getColor('package'),
            }}>
            Repositorio
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  albumListMainContainer: {
    position: 'relative',
    height: '100%',
    paddingBottom: 100,
  },
  albumListHeader: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  albumListHeaderText: {
    paddingTop: 2,
    color: colores.negro,
    fontWeight: '600',
    fontSize: 19,
  },
  albumListHeaderTextContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 14,
    paddingRight: 20,
    paddingBottom: 1,
  },
  albumListContent: {
    width: '100%',
  },
  albumListIconContainer: {
    position: 'absolute',
    bottom: 0,
    height: 55,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colores.blanco,
    zIndex: 999,
    elevation: 999,
  },

  albumListSocialIconItem: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  albumListSocialIconText: {
    fontSize: 12,
    fontWeight: '600',
  },
  albumListAlbumContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  albumListMessageContainer: {
    height: 120,
    width: '100%',
    maxWidth: 768,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  albumListMessage: {
    marginLeft: 20,
    color: 'black',
    fontFamily: tipoDeLetra.bold,
    fontSize: 18,
  },
});

export default AlbumList;
