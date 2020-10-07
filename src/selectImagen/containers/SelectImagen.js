import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import concat from 'lodash/concat';
import {nanoid} from 'nanoid/non-secure';
import CameraRoll from '@react-native-community/cameraroll';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Cargando from '../../generales/Cargando';
import ImagenItem from '../components/ImagenItem';
import Icon from 'react-native-vector-icons/dist/Feather';

function SelectImagen({dispatch, navigation, route, format}) {
  const {albumTitle, storageId} = route.params;
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const customImagesStorageId = useRef(storageId || nanoid());

  const loadImages = useCallback(async () => {
    const photos = await CameraRoll.getPhotos({
      assetType: 'Photos',
      first: 500,
      groupName: albumTitle,
      include: ['filename', 'location'],
    });

    setEdges(photos.edges);
    setLoading(false);
  }, [albumTitle, setEdges, setLoading]);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const hasMinQuantitiy = () => selectedImages.length >= format.min_quantity;

  const handleOnPressGoToBack = () =>
    navigation.navigate('SelectAlbum', {
      formatId: format.id,
    });

  const handleSaveImageInStorage = (images) => {
    dispatch(
      actions.actualizarImagenesSeleccionadas(
        customImagesStorageId.current,
        images,
      ),
    );
  };

  const handleAddImage = (uri, base64) => {
    const baseImg = {uri, base64};
    const images = concat(selectedImages, [baseImg]);
    setSelectedImages(images);
    handleSaveImageInStorage(images);
  };

  const handleRemoveImage = (uri) => {
    const images = selectedImages.filter(
      (selectedImage) => selectedImage.uri !== uri,
    );
    setSelectedImages(images);
    handleSaveImageInStorage(images);
  };

  const handleOnPressCheckImage = (uri, isCheck, base64) => {
    if (isCheck) {
      handleAddImage(uri, base64);
    } else {
      handleRemoveImage(uri);
    }
  };

  const handleOnPressGoToLayout = () => {
    if (hasMinQuantitiy()) {
      navigation.navigate('CartLayout', {
        formatId: format.id,
        storageId: customImagesStorageId.current,
      });
    }
  };

  const renderImage = ({item: edge}) => (
    <ImagenItem
      uri={edge.node.image.uri}
      onPressCheckImage={handleOnPressCheckImage}
    />
  );

  return (
    <View style={style.selectImagenMainContainer}>
      <TouchableOpacity
        style={style.selectImagenHeader}
        onPress={handleOnPressGoToBack}>
        <Icon name="arrow-left" size={27} color="#000" />
        <View style={style.selectImagenHeaderTextContainer}>
          <Text style={style.selectImagenHeaderText}>
            {' '}
            {selectedImages.length} / {format.min_quantity}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={style.selectImagenListContainer}>
        {loading ? (
          <Cargando titulo="" />
        ) : (
          <FlatList
            data={edges}
            numColumns={3}
            renderItem={renderImage}
            keyExtractor={(edge) => edge.node.image.uri}
          />
        )}
      </View>
      <View style={style.selectImagenButtonContainer}>
        <TouchableOpacity
          style={style.selectImagenButton}
          onPress={handleOnPressGoToLayout}
          disabled={!hasMinQuantitiy()}>
          {!hasMinQuantitiy() && <View style={style.selectImagenOverlay} />}
          <Text style={style.selectImagenButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  selectImagenMainContainer: {
    position: 'relative',
    height: '100%',
    paddingBottom: 100,
  },
  selectImagenHeader: {
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
  selectImagenHeaderText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 19,
  },
  selectImagenHeaderTextContainer: {
    marginLeft: 15,
    paddingBottom: 0.5,
  },
  selectImagenListContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  selectImagenButtonContainer: {
    position: 'absolute',
    bottom: 22,
    width: '100%',
    alignItems: 'center',
  },
  selectImagenButton: {
    position: 'relative',
    width: 400,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 290486,
    backgroundColor: colores.logo,
  },
  selectImagenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 290486,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectImagenButtonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 20,
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

export default connect(mapStateToProps)(SelectImagen);
