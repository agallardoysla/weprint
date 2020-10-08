import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AlbumList from './components/AlbumList';
import ImagesList from './components/ImagesList';
import {colores, tipoDeLetra} from '../../constantes/Temas';

/*const getBase64 = async () => {
    try {
      if (base64Cache) {
        return base64Cache;
      }

      const base64Str = await RNFetchBlob.fs.readFile(uri, 'base64');
      setBase64Cache(base64Str);

      return base64Str;
    } catch (error) {
      throw new Error('Error');
    }
  };*/

const SelectionImage = ({minQuantity, maxQuantity}) => {
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [showImagesList, setShowImagesList] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleOnPressSelectAlbum = (albumTitle) => {
    setSelectedAlbum(albumTitle);
    setShowImagesList(true);
  };

  const handleOnPressGoToAlbumList = () => {
    setSelectedAlbum('');
    setShowImagesList(false);
  };

  const hasMinQuantitiy = () => selectedImages.length >= minQuantity;
  const hasMaxQuantity = () =>
    maxQuantity > 0 && selectedImages.length == maxQuantity;

  const handleSelectImages = (images) => {
    if (!hasMaxQuantity()) {
      setSelectedImages(images);
    } else {
      Alert.alert(`Solo tiene un máximo permitido de ${maxQuantity} imágenes`);
    }
  };

  return (
    <View style={style.mainContainer}>
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
        />
      )}
      <View style={style.imagesListButtonContainer}>
        <TouchableOpacity
          style={style.imagesListButton}
          onPress={() => {}}
          disabled={!hasMinQuantitiy()}>
          {!hasMinQuantitiy() && <View style={style.imagesListOverlay} />}
          <Text style={style.imagesListButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  imagesListButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  imagesListButton: {
    position: 'relative',
    width: 400,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 290486,
    backgroundColor: colores.logo,
  },
  imagesListOverlay: {
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
  imagesListButtonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 20,
  },
});

SelectionImage.defaultProps = {
  minQuantity: 1,
  maxQuantity: 0,
};

export default SelectionImage;
