import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import CameraRoll from '@react-native-community/cameraroll';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import Cargando from '../../Cargando';
import ImageItem from './ImageItem';
import Icon from 'react-native-vector-icons/dist/Feather';

const ImagesList = ({
  albumTitle,
  selectedImages,
  minQuantity,
  maxQuantity,
  hasMaxQuantity,
  onSelectImages,
  onPressGoToAlbum,
}) => {
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);

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

  const getNodesFromEdges = useCallback(() => edges.map((edge) => edge.node), [
    edges,
  ]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const nodes = getNodesFromEdges();

    const isSelectedAll = nodes.every((node) =>
      selectedImages.some(
        (selectedImage) => selectedImage.uri === node.image.uri,
      ),
    );

    setSelectAll(isSelectedAll);
  }, [selectedImages, getNodesFromEdges, setSelectAll]);

  const handleAddImage = (node) => {
    const images = concat(selectedImages, [{uri: node.image.uri, node}]);
    onSelectImages(images);
  };

  const handleRemoveImage = (node) => {
    const images = selectedImages.filter(
      (selectedImage) => selectedImage.uri !== node.image.uri,
    );
    onSelectImages(images);
  };

  const handleOnPressCheckImage = (node, isCheck) => {
    if (isCheck) {
      handleAddImage(node);
    } else {
      handleRemoveImage(node);
    }
  };

  const onSelectAll = () => {
    const nodes = getNodesFromEdges();
    const imagesFromAlbum = nodes.map((node) => ({
      node,
      uri: node.image.uri,
    }));

    const images = concat(selectedImages, imagesFromAlbum);
    onSelectImages(uniq(images));
  };

  const onDeselectAll = () => {
    const nodes = getNodesFromEdges();
    const images = selectedImages.filter(
      (selectedImage) =>
        !nodes.some((node) => node.image.uri === selectedImage.uri),
    );

    onSelectImages(images);
  };

  const handleOnPressSelectAll = () => {
    if (selectAll) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const handleImageIsSelected = (uri) =>
    selectedImages.some((selectedImage) => selectedImage.uri === uri);

  const renderImage = ({item: edge}) => {
    const isSelected = handleImageIsSelected(edge.node.image.uri);

    return (
      <ImageItem
        node={edge.node}
        isSelected={isSelected}
        hasMaxQuantity={hasMaxQuantity}
        onPressCheckImage={handleOnPressCheckImage}
      />
    );
  };

  return (
    <View style={style.imagesListMainContainer}>
      <TouchableOpacity
        style={style.imagesListHeader}
        onPress={onPressGoToAlbum}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
        <View style={style.imagesListHeaderTextContainer}>
          <View>
            <Text style={style.imagesListHeaderText}> Imágenes</Text>
          </View>
          {minQuantity > 0 && (
            <View>
              <Text style={style.imagesListHeaderText}>
                {selectedImages.length}/{minQuantity}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {edges.length > 0 && (
        <View style={style.imageListButtonContainer}>
          <View>
            <Text style={style.imagesListAlbumText}>{albumTitle}</Text>
          </View>
          {maxQuantity === 0 && (
            <TouchableHighlight
              style={style.imagesListButton}
              onPress={handleOnPressSelectAll}
              underlayColor={colores.blanco}>
              <Text style={style.imagesListButtonText}>
                {selectAll ? 'Deseleccionar' : 'Seleccionar todo'}
              </Text>
            </TouchableHighlight>
          )}
        </View>
      )}

      <View style={style.imagesListContainer}>
        {loading ? (
          <Cargando titulo="" loaderColor={colores.logo} />
        ) : (
          <FlatList
            data={edges}
            numColumns={3}
            renderItem={renderImage}
            keyExtractor={(edge) => edge.node.image.uri}
          />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  imagesListMainContainer: {
    position: 'relative',
    height: '100%',
    paddingBottom: 100,
  },
  imagesListHeader: {
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
  imagesListHeaderText: {
    color: colores.negro,
    fontFamily: tipoDeLetra.bold,
    fontSize: 19,
  },
  imagesListHeaderTextContainer: {
    flexGrow: 1,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingBottom: 0.5,
  },
  imagesListContainer: {
    marginTop: 15,
    paddingVertical: 10,
  },
  imageListButtonContainer: {
    marginTop: 15,
    paddingLeft: 18,
    paddingRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imagesListButton: {
    marginTop: 5,
    width: 130,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 290486,
    borderColor: colores.logo,
    backgroundColor: colores.blanco,
  },
  imagesListButtonText: {
    color: colores.logo,
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  imagesListAlbumText: {
    paddingTop: 1,
    fontFamily: tipoDeLetra.bold,
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.negro,
  },
});

export default ImagesList;
