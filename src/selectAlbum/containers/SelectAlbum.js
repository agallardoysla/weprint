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
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import AlbumItem from '../components/AlbumItem';
import Cargando from '../../generales/Cargando';

function SelectAlbum({dispatch, navigation, format}) {
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
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  useEffect(() => {
    getAlbumsFromPhone();
  }, [getAlbumsFromPhone]);

  const handleOnPressGoToBack = () => navigation.navigate('Format');

  const handleGoToSelectImagen = (albumTitle) =>
    navigation.navigate('SelectImagen', {
      formatId: format.id,
      albumTitle,
    });

  const renderAlbums = ({item: album}) => (
    <AlbumItem
      album={album}
      getPhotosByAlbumFromPhone={getPhotosByAlbumFromPhone}
      onPressGoToSelectImagen={handleGoToSelectImagen}
    />
  );

  const isSelectedStorage = (storageSelected) => storageSelected === storage;

  return (
    <View style={style.selectAlbumMainContainer}>
      <TouchableOpacity
        style={style.selectAlbumHeader}
        onPress={handleOnPressGoToBack}>
        <Icon name="arrow-left" size={27} color="#000" />
        <View style={style.selectAlbumHeaderTextContainer}>
          <Text style={style.selectAlbumHeaderText}>Seleccionar</Text>
        </View>
      </TouchableOpacity>
      <View style={style.selectAlbumIconContainer}>
        <TouchableOpacity
          style={
            isSelectedStorage('device')
              ? style.selectAlbumStorage
              : style.selectAlbumSocialMediaContainer
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
              ? style.selectAlbumStorage
              : style.selectAlbumSocialMediaContainer
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
              ? style.selectAlbumStorage
              : style.selectAlbumSocialMediaContainer
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
      {loading && <Cargando titulo=" " />}
      {!loading && albums.length && (
        <View style={style.selectAlbumAlbumContainer}>
          <FlatList
            data={albums}
            numColumns={2}
            renderItem={renderAlbums}
            keyExtractor={(album) => album.title}
          />
        </View>
      )}
      {!loading && !albums.length && (
        <View style={style.selectAlbumMessageContainer}>
          <Text style={style.selectAlbumMessage}>
            No se pudo acceder a álbumes
          </Text>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  selectAlbumMainContainer: {
    height: '100%',
    paddingBottom: 100,
  },
  selectAlbumHeader: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    backgroundColor: colores.blanco,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  selectAlbumHeaderText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 19,
  },
  selectAlbumHeaderTextContainer: {
    marginLeft: 12,
    paddingBottom: 1,
  },
  selectAlbumIconContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blanco,
  },
  selectAlbumSocialMediaContainer: {
    marginHorizontal: 20,
    paddingBottom: 5,
  },
  selectAlbumStorage: {
    marginHorizontal: 20,
    paddingBottom: 5,
    borderBottomColor: colores.azulNoche,
    borderBottomWidth: 2,
  },
  selectAlbumAlbumContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  selectAlbumMessageContainer: {
    height: 120,
    width: '100%',
    maxWidth: 768,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  selectAlbumMessage: {
    marginLeft: 20,
    color: 'black',
    fontFamily: tipoDeLetra.bold,
    fontSize: 18,
  },
});

const mapStateToProps = (
  state,
  {
    route: {
      params: {formatId},
    },
  },
) => {
  const format = state.format.data.find(
    (searchedFormat) => searchedFormat.id === formatId,
  );

  return {
    format,
  };
};

export default connect(mapStateToProps)(SelectAlbum);
