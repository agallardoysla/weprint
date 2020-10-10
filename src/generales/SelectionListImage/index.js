import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AlbumList from './components/AlbumList';
import ImagesList from './components/ImagesList';
import Cargando from '../Cargando';
import {colores, tipoDeLetra} from '../../constantes/Temas';

const SelectionListImage = ({
  minQuantity,
  maxQuantity,
  onPressGoToBack,
  onResponse,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [loading, setLoading] = useState(false);
  const [showImagesList, setShowImagesList] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleOnPressSelectAlbum = (albumTitle) => {
    if (!loading) {
      setSelectedAlbum(albumTitle);
      setShowImagesList(true);
    }
  };

  const handleOnPressGoToAlbumList = () => {
    if (!loading) {
      setSelectedAlbum('');
      setShowImagesList(false);
    }
  };

  const getImageToBase64 = (uri) => {
    return new Promise(async (resolve, reject) => {
      try {
        const base64 = await RNFetchBlob.fs.readFile(uri, 'base64');
        resolve({uri, base64});
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleTransformImagesToBase64 = async () => {
    setLoading(true);
    const promises = selectedImages.map((selectedImage) =>
      getImageToBase64(selectedImage),
    );

    try {
      const imagesToBase64 = await Promise.all(promises);
      setLoading(false);
      onResponse(imagesToBase64);
    } catch {
      Alert.alert('Ha ocurrido un error vuelve a intentarlo');
      setLoading(false);
    }
  };

  const hasMinQuantitiy = () => selectedImages.length >= minQuantity;
  const hasMaxQuantity = () =>
    maxQuantity > 0 && selectedImages.length == maxQuantity;

  const handleSelectImages = (images) => {
    if (!loading) {
      if (!hasMaxQuantity()) {
        setSelectedImages(images);
      } else {
        Alert.alert(
          `Solo tiene un máximo permitido de ${maxQuantity} imágenes`,
        );
      }
    }
  };

  return (
    <View style={style.mainContainer}>
      {loading && (
        <View style={style.overlay}>
          <Cargando titulo="" loaderColor={colores.logo} />
        </View>
      )}
      {showImagesList ? (
        <ImagesList
          albumTitle={selectedAlbum}
          selectedImages={selectedImages}
          onSelectImages={handleSelectImages}
          onPressGoToAlbum={handleOnPressGoToAlbumList}
          minQuantity={minQuantity}
        />
      ) : (
        <AlbumList
          minQuantity={minQuantity}
          selectedImages={selectedImages}
          onPressSelectAlbum={handleOnPressSelectAlbum}
          onPressGoToBack={onPressGoToBack}
        />
      )}
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.button}
          onPress={handleTransformImagesToBase64}
          disabled={!hasMinQuantitiy() || loading}>
          {!hasMinQuantitiy() && <View style={style.overlayButton} />}
          <Text style={style.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    width: 400,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 290486,
    backgroundColor: colores.logo,
  },
  overlayButton: {
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    elevation: 5,
  },
  buttonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 20,
  },
});

SelectionListImage.defaultProps = {
  minQuantity: 1,
  maxQuantity: 0,
};

export default SelectionListImage;
