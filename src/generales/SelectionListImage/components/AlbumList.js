import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/dist/Feather';
import AlbumItem from './AlbumItem';
import AlbumIconItem from './AlbumIconItem';
import Cargando from '../../Cargando';
import {colores} from '../../../constantes/Temas';
import {get_repositories} from '../../../utils/apis/repository_api';

const AlbumList = ({
  minQuantity,
  selectedImages,
  storage,
  onChangeStorage,
  onPressSelectAlbum,
  onPressGoToBack,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [albums, setAlbums] = useState([]);

  const checkAndroidPermission = useCallback(async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }, []);

  const getPhotosByAlbumFromPhone = useCallback(async (number, groupName) => {
    const photos = await CameraRoll.getPhotos({
      assetType: 'Photos',
      first: number,
      groupName,
      include: ['filename', 'location'],
    });

    return photos;
  }, []);

  const getAlbumsFromPhone = useCallback(async () => {
    setLoading(true);

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
  }, [getPhotosByAlbumFromPhone]);

  const getRepositories = useCallback(async () => {
    setLoading(true);

    try {
      const response = await get_repositories();
      const albumsFromRepositories = response.data.map((repository) => {
        return {
          id: repository.id,
          title: repository.name,
          count: repository.totalPieces,
          firstImage: repository.lastImage,
        };
      });

      setAlbums(albumsFromRepositories);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);
  const renderAlbums = ({item: album}) => (
    <AlbumItem album={album} onPressSelectAlbum={onPressSelectAlbum} />
  );

  const handleOnPressDevice = (storageName) => {
    if (!loading) {
      onChangeStorage(storageName);
      getAlbumsFromPhone();
    }
  };

  const handleOnPressRepository = (storageName) => {
    if (!loading) {
      onChangeStorage(storageName);
      getRepositories();
    }
  };

  useEffect(() => {
    const hasPermission = async () => {
      if (Platform.OS === 'android' && (await checkAndroidPermission())) {
        getAlbumsFromPhone();
      }
    };

    if (storage === 'device') {
      hasPermission();
    } else if (storage === 'package') {
      getRepositories();
    }
  }, [checkAndroidPermission, getAlbumsFromPhone, getRepositories, storage]);

  return (
    <View style={style.mainContainer}>
      <TouchableOpacity style={style.header} onPress={onPressGoToBack}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
        <View style={style.headerTextContainer}>
          <View>
            <Text style={style.headerText}>Álbumes</Text>
          </View>
          {selectedImages.length > 0 && (
            <View>
              <Text style={style.headerText}>
                {selectedImages.length}/{minQuantity}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {loading && <Cargando titulo=" " loaderColor={colores.logo} />}
      {!loading && !error && albums.length && (
        <FlatList
          style={style.listContainer}
          data={albums}
          numColumns={2}
          renderItem={renderAlbums}
          keyExtractor={(album) => album.title}
        />
      )}
      <View style={style.iconContainer}>
        <AlbumIconItem
          storage={storage}
          title="Dispositivo"
          storageName="device"
          iconName="smartphone"
          onPressStorage={handleOnPressDevice}
        />
        <AlbumIconItem
          storage={storage}
          title="Repositorio"
          storageName="package"
          iconName="package"
          onPressStorage={handleOnPressRepository}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: '100%',
    paddingBottom: 100,
  },
  header: {
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
  headerText: {
    paddingTop: 2,
    color: colores.negro,
    fontWeight: '600',
    fontSize: 19,
  },
  headerTextContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 14,
    paddingRight: 20,
    paddingBottom: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    height: 55,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blanco,
    zIndex: 999,
    elevation: 999,
  },
  listContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
});

export default AlbumList;
