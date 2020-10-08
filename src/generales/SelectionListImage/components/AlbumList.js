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

      setAlbums(albumsFromPhone);
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
    <AlbumItem
      album={album}
      getPhotosByAlbumFromPhone={getPhotosByAlbumFromPhone}
      onPressSelectAlbum={onPressSelectAlbum}
    />
  );

  const isSelectedStorage = (storageSelected) => storageSelected === storage;

  return (
    <View style={style.albumListMainContainer}>
      <TouchableOpacity style={style.albumListHeader} onPress={onPressGoToBack}>
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
      <View style={style.albumListIconContainer}>
        <TouchableOpacity
          style={
            isSelectedStorage('device')
              ? style.albumListStorage
              : style.albumListSocialMediaContainer
          }>
          <Icon
            name="smartphone"
            size={27}
            color={
              isSelectedStorage('device')
                ? colores.azulNoche
                : colores.grisClaro
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isSelectedStorage('facebook')
              ? style.albumListStorage
              : style.albumListSocialMediaContainer
          }>
          <Icon
            name="facebook"
            size={27}
            color={
              isSelectedStorage('facebook')
                ? colores.azulNoche
                : colores.grisClaro
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isSelectedStorage('instagram')
              ? style.albumListStorage
              : style.albumListSocialMediaContainer
          }>
          <Icon
            name="instagram"
            size={27}
            color={
              isSelectedStorage('instagram')
                ? colores.azulNoche
                : colores.grisClaro
            }
          />
        </TouchableOpacity>
      </View>
      {loading && <Cargando titulo=" " loaderColor={colores.logo} />}
      {!loading && albums.length && (
        <View style={style.albumListAlbumContainer}>
          <FlatList
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
    </View>
  );
};

const style = StyleSheet.create({
  albumListMainContainer: {
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
    color: 'black',
    fontWeight: '600',
    fontSize: 19,
  },
  albumListHeaderTextContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
    paddingRight: 20,
    paddingBottom: 1,
  },
  albumListIconContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blanco,
  },
  albumListSocialMediaContainer: {
    marginHorizontal: 20,
    paddingBottom: 5,
  },
  albumListStorage: {
    marginHorizontal: 20,
    paddingBottom: 5,
    borderBottomColor: colores.azulNoche,
    borderBottomWidth: 2,
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
