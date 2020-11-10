import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AlbumList from './components/AlbumList';
import ImagesList from './components/ImagesList';
import CargandoOverlay from '../CargandoOverlay';
import StorageImageList from './components/StorageImageList';
import {colores, tipoDeLetra} from '../../constantes/Temas';

const SelectionListImage = ({
  minQuantity,
  maxQuantity,
  preSelectedImages,
  onPressGoToBack,
  onResponse,
}) => {
  const [albumIdentifier, setAlbumIdentifier] = useState('');
  const [selectedImages, setSelectedImages] = useState(preSelectedImages);
  const [hasMaxQuantity, setHasMaxQuantity] = useState(false);
  const [listImage, setListImage] = useState(0);
  const [storage, setStorage] = useState('device');
  const [loading, setLoading] = useState(false);

  const handleChangeStorage = (storageName) => setStorage(storageName);

  const handleOnPressSelectAlbum = (identifier) => {
    if (!loading) {
      setAlbumIdentifier(identifier);

      if (storage === 'device') {
        setListImage(1);
      } else if (storage === 'package') {
        setListImage(2);
      }
    }
  };

  const handleOnPressGoToAlbumList = () => {
    setAlbumIdentifier('');
    setListImage(0);
  };

  const hasMinQuantitiy = () => selectedImages.length >= minQuantity;

  const handleSelectImages = (images) => {
    if (!loading) {
      if (!hasMaxQuantity || images.length < selectedImages.length) {
        setSelectedImages(images);
      }
    }
  };

  const handleRespond = () => setLoading(true);

  const getStyleButton = (imageListNumber) =>
    StyleSheet.create({
      buttonContainer: {
        position: 'absolute',
        bottom: imageListNumber > 0 ? 10 : 65,
        width: '100%',
        alignItems: 'center',
        zIndex: 999,
        elevation: 999,
      },
    });

  const renderButtom = () => {
    return listImage > 0 || (listImage === 0 && hasMinQuantitiy());
  };

  useEffect(() => {
    if (maxQuantity > 0 && selectedImages.length === maxQuantity) {
      setHasMaxQuantity(true);
    } else {
      setHasMaxQuantity(false);
    }
  }, [selectedImages, maxQuantity]);

  useEffect(() => {
    if (loading) {
      onResponse(selectedImages);
    }
  }, [onResponse, loading, selectedImages]);

  return (
    <>
      {listImage === 0 && (
        <AlbumList
          minQuantity={minQuantity}
          selectedImages={selectedImages}
          storage={storage}
          onPressSelectAlbum={handleOnPressSelectAlbum}
          onChangeStorage={handleChangeStorage}
          onPressGoToBack={onPressGoToBack}
        />
      )}
      {listImage === 1 && (
        <ImagesList
          albumTitle={albumIdentifier}
          preSelectedImages={preSelectedImages}
          selectedImages={selectedImages}
          onSelectImages={handleSelectImages}
          onPressGoToAlbum={handleOnPressGoToAlbumList}
          minQuantity={minQuantity}
          maxQuantity={maxQuantity}
          hasMaxQuantity={hasMaxQuantity}
        />
      )}
      {listImage === 2 && (
        <StorageImageList
          storage={storage}
          albumIdentifier={albumIdentifier}
          selectedImages={selectedImages}
          preSelectedImages={preSelectedImages}
          onPressGoToAlbum={handleOnPressGoToAlbumList}
          onSelectImages={handleSelectImages}
          minQuantity={minQuantity}
          maxQuantity={maxQuantity}
          hasMaxQuantity={hasMaxQuantity}
        />
      )}
      {renderButtom() && (
        <View style={getStyleButton(listImage).buttonContainer}>
          <TouchableOpacity
            style={style.button}
            onPress={handleRespond}
            disabled={loading || !hasMinQuantitiy()}>
            {(loading || !hasMinQuantitiy()) && (
              <View style={style.overlayButton} />
            )}
            {loading ? (
              <ActivityIndicator size={25} color={colores.blanco} />
            ) : (
              <Text style={style.buttonText}>Siguiente</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      {loading && <CargandoOverlay />}
    </>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    zIndex: 999,
    elevation: 999,
  },
  button: {
    position: 'relative',
    width: '80%',
    marginHorizontal: '20%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 290486,
    backgroundColor: colores.logo,
  },
  buttonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 20,
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
});

SelectionListImage.defaultProps = {
  minQuantity: 1,
  maxQuantity: 0,
  preSelectedImages: [],
};

export default SelectionListImage;
