import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/Feather';
import Cargando from '../../Cargando';
import StorageImage from './StorageImage';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import {get_pieces_from_repository} from '../../../utils/apis/repository_api';

const StorageImageList = ({
  albumIdentifier,
  storage,
  minQuantity,
  maxQuantity,
  hasMaxQuantity,
  selectedImages,
  onPressGoToAlbum,
  onSelectImages,
  preSelectedImages,
}) => {
  const [storageImages, setStorageImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedAll, setSelectedAll] = useState(false);

  const loadImagesFromRepository = useCallback(async () => {
    try {
      const response = await get_pieces_from_repository(albumIdentifier);
      const images = response.data.map((image) => image.file);

      setLoading(false);
      setStorageImages(images);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, [albumIdentifier]);

  const handleAddImage = (uri) => {
    const images = concat(selectedImages, [{uri, node: null}]);
    onSelectImages(images);
  };

  const handleRemoveImage = (uri) => {
    const imagesReverse = concat(selectedImages).reverse();
    const indexDelete = imagesReverse.findIndex(
      (imageReverse) => imageReverse.uri === uri,
    );

    const images = imagesReverse
      .filter((_, index) => index !== indexDelete)
      .reverse();

    onSelectImages(images);
  };

  const handleOnPressCheckImage = (uri, isCheck) => {
    if (isCheck) {
      handleAddImage(uri);
    } else {
      handleRemoveImage(uri);
    }
  };

  const handleImageIsSelected = (uri) => {
    return selectedImages.some((selectedImage) => selectedImage.uri === uri);
  };

  const handleImageIsPreSelected = (uri) => {
    return preSelectedImages.some((image) => image.uri === uri);
  };

  const onSelectAll = () => {
    const offset = minQuantity - selectedImages.length;
    const necessaryImages = storageImages.slice(0, offset);

    const imagesFromStorage = necessaryImages.map((uri) => ({
      node: null,
      uri,
    }));

    const images = concat(selectedImages, imagesFromStorage);

    onSelectImages(uniq(images));
  };

  const onDeselectAll = () => {
    const images = selectedImages.filter(
      (selectedImage) =>
        !storageImages.some((uri) => selectedImage.uri === uri),
    );

    onSelectImages(images);
  };

  const handleOnPressSelectAll = () => {
    if (selectedAll) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const showButtonAll = useCallback(() => {
    return maxQuantity === 0 && preSelectedImages.length === 0;
  }, [maxQuantity, preSelectedImages]);

  const disabledButtonAll = () => {
    return selectedImages.length >= minQuantity && !selectedAll;
  };

  const renderImage = ({item: uri}) => {
    const isPreSelected = handleImageIsPreSelected(uri);
    const isSelected = isPreSelected || handleImageIsSelected(uri);

    return (
      <StorageImage
        uri={uri}
        onPressCheckImage={handleOnPressCheckImage}
        isPreSelected={isPreSelected}
        hasMaxQuantity={hasMaxQuantity}
        isSelected={isSelected}
      />
    );
  };

  useEffect(() => {
    if (storage === 'package') {
      loadImagesFromRepository();
    }
  }, [storage, loadImagesFromRepository]);

  useEffect(() => {
    if (showButtonAll()) {
      const someIsSelected = selectedImages.some((selectedImage) =>
        storageImages.find((uri) => selectedImage.uri === uri),
      );

      setSelectedAll(someIsSelected);
    }
  }, [selectedImages, storageImages, showButtonAll]);

  return (
    <View style={style.mainContainer}>
      <TouchableOpacity style={style.header} onPress={onPressGoToAlbum}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
        <View style={style.headerTextContainer}>
          <View>
            <Text style={style.headerText}> Imágenes</Text>
          </View>
          {minQuantity > 0 && (
            <View>
              <Text style={style.headerText}>
                {selectedImages.length}/{minQuantity}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {loading && <Cargando titulo=" " loaderColor={colores.logo} />}

      {storageImages.length > 0 && !error && !loading && (
        <View style={style.buttonContainer}>
          {showButtonAll() && (
            <TouchableHighlight
              disabled={disabledButtonAll()}
              style={{
                ...style.button,
                opacity: disabledButtonAll() ? 0.5 : 1,
              }}
              onPress={handleOnPressSelectAll}
              underlayColor={colores.blanco}>
              <Text style={style.buttonText}>
                {selectedAll ? 'Deseleccionar' : 'Seleccionar todo'}
              </Text>
            </TouchableHighlight>
          )}
        </View>
      )}
      <FlatList
        style={style.listContainer}
        contentContainerStyle={style.listContent}
        data={storageImages}
        numColumns={3}
        renderItem={renderImage}
        keyExtractor={(image, index) => `${image.uri}-${index}`}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
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
    color: colores.negro,
    fontFamily: tipoDeLetra.bold,
    fontSize: 19,
  },
  headerTextContainer: {
    flexGrow: 1,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingBottom: 0.5,
  },
  listContainer: {
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 50,
  },
  buttonContainer: {
    marginTop: 18,
    paddingLeft: 14,
    paddingRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    marginTop: 3,
    width: 120,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 290486,
    borderColor: colores.logo,
    backgroundColor: colores.blanco,
  },
  buttonText: {
    color: colores.logo,
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default StorageImageList;
