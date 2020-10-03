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

function SelectImage({dispatch, navigation, format}) {
  const [albums, setAlbums] = useState([]);
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

  const renderAlbums = ({item: album}) => (
    <AlbumItem
      album={album}
      getPhotosByAlbumFromPhone={getPhotosByAlbumFromPhone}
    />
  );

  return (
    <View style={style.selectImageMainContainer}>
      <TouchableOpacity
        style={style.selectImageHeader}
        onPress={handleOnPressGoToBack}>
        <Icon name="arrow-left" size={27} color="#000" />
        <View style={style.selectImageHeaderTextContainer}>
          <Text style={style.selectImageHeaderText}>Seleccionar</Text>
        </View>
      </TouchableOpacity>
      <View style={style.selectImageIconContainer}>
        <TouchableOpacity style={style.selectImageSocialMediaContainer}>
          <Icon name="smartphone" size={27} color={colores.grisClaro} />
        </TouchableOpacity>
        <TouchableOpacity style={style.selectImageSocialMediaContainer}>
          <Icon name="facebook" size={27} color={colores.grisClaro} />
        </TouchableOpacity>
        <TouchableOpacity style={style.selectImageSocialMediaContainer}>
          <Icon name="instagram" size={27} color={colores.grisClaro} />
        </TouchableOpacity>
      </View>
      {loading && <Cargando titulo=" " />}
      {!loading && albums.length > 0 ? (
        <View style={style.selectImageAlbumContainer}>
          <FlatList
            data={albums}
            numColumns={2}
            renderItem={renderAlbums}
            keyExtractor={(album) => album.title}
          />
        </View>
      ) : (
        <View style={style.selectImageMessageContainer}>
          <Text style={style.selectImageMessage}>
            No se pudo acceder álbumes
          </Text>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  selectImageMainContainer: {
    height: '100%',
    paddingBottom: 100,
  },
  selectImageHeader: {
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
  selectImageHeaderText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 19,
  },
  selectImageHeaderTextContainer: {
    marginLeft: 12,
    paddingBottom: 1,
  },
  selectImageIconContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blanco,
  },
  selectImageSocialMediaContainer: {
    marginHorizontal: 20,
  },
  selectImageAlbumContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  selectImageMessageContainer: {
    height: 120,
    width: '100%',
    maxWidth: 768,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  selectImageMessage: {
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

export default connect(mapStateToProps)(SelectImage);
