import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import GeneralImage from '../../generales/GeneralImage';
import Icon from 'react-native-vector-icons/dist/Feather';
import fill from 'lodash/fill';
import concat from 'lodash/concat';
import isNull from 'lodash/isNull';
import {colores} from '../../constantes/Temas';

const BasicCartLayout = ({onShowListImage, onEditPhoto, getSelectedImages}) => {
  const pieces = getSelectedImages(1);
  const piece = pieces[0];
  const handleShowListImage = () => onShowListImage();
  const handleEditPhoto = () => onEditPhoto(piece.file);

  return (
    <>
      <View style={style.basicLayoutItem}>
        {piece.file.uri ? (
          <TouchableOpacity onPress={handleEditPhoto}>
            <GeneralImage
              styleImg={style.basicLayoutItem}
              uri={piece.file.uri}
              base64={piece.file.base64}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={style.selectImageWrapper}
            onPress={handleShowListImage}>
            <View style={style.wrapperIcon}>
              <Icon name="plus" size={15} color={colores.verde} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const TwoCartLayout = ({onShowListImage, onEditPhoto, getSelectedImages}) => {
  const pieces = getSelectedImages(2);
  const offsetSelectImg = pieces.filter((piece) => isNull(piece.file.uri))
    .length;

  const handleShowListImage = () =>
    onShowListImage(offsetSelectImg, offsetSelectImg);

  return (
    <View style={style.layoutTwoColumnsContainer}>
      {pieces.map((piece, index) => {
        const handleEditPhoto = () => onEditPhoto(piece.file);
        return (
          <View style={style.layoutLargeItem} key={index}>
            {piece.file.uri ? (
              <TouchableOpacity onPress={handleEditPhoto}>
                <GeneralImage
                  styleImg={style.basicLayoutItem}
                  uri={piece.file.uri}
                  base64={piece.file.base64}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.selectImageWrapper}
                onPress={handleShowListImage}>
                <View style={style.wrapperIcon}>
                  <Icon name="plus" size={15} color={colores.verde} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

const ThreeCartLayout = ({onShowListImage, onEditPhoto, getSelectedImages}) => {
  const pieces = getSelectedImages(4);
  const firstColumnPiece = pieces[0];
  const secondColumnPieces = pieces.slice(1, 4);

  const offsetSelectImg = concat(
    [firstColumnPiece],
    secondColumnPieces,
  ).filter((piece) => isNull(piece.file.uri)).length;

  const handleShowListImage = () =>
    onShowListImage(offsetSelectImg, offsetSelectImg);

  const handleOnEditFirstImage = () => onEditPhoto(firstColumnPiece.file);

  return (
    <View style={style.layoutTwoColumnsContainer}>
      <View style={(style.layoutLargeItem, {width: '60%', marginBottom: 10})}>
        {firstColumnPiece.file.uri ? (
          <TouchableOpacity onPress={handleOnEditFirstImage}>
            <GeneralImage
              styleImg={style.basicLayoutItem}
              uri={firstColumnPiece.file.uri}
              base64={firstColumnPiece.file.base64}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={style.selectImageWrapper}
            onPress={handleShowListImage}>
            <View style={style.wrapperIcon}>
              <Icon name="plus" size={15} color={colores.verde} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={(style.layoutLargeItem, {width: '35%'})}>
        {secondColumnPieces.map((piece, index) => {
          const handleEditPhoto = () => onEditPhoto(piece.file);
          return (
            <View style={style.layoutSquareItem} key={index}>
              {piece.file.uri ? (
                <TouchableOpacity onPress={handleEditPhoto}>
                  <GeneralImage
                    styleImg={style.basicLayoutItem}
                    uri={piece.file.uri}
                    base64={piece.file.base64}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.selectImageWrapper}
                  onPress={handleShowListImage}>
                  <View style={style.wrapperIcon}>
                    <Icon name="plus" size={15} color={colores.verde} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const FourthCartLayout = ({
  getSelectedImages,
  onEditPhoto,
  onShowListImage,
}) => {
  const pieces = getSelectedImages(3);

  const firstColumnPieces = pieces.slice(1, 3);
  const secondColumnPiece = pieces[0];

  const offsetSelectImg = concat(firstColumnPieces, [
    secondColumnPiece,
  ]).filter((piece) => isNull(piece.file.uri)).length;

  const handleShowListImage = () =>
    onShowListImage(offsetSelectImg, offsetSelectImg);

  const handleEditPhotoSecondColumn = () => onEditPhoto(secondColumnPiece.file);

  return (
    <View style={style.layoutTwoColumnsContainer}>
      <View style={(style.layoutLargeItem, {width: '45%'})}>
        {firstColumnPieces.map((piece, index) => {
          const handleEditPhoto = () => onEditPhoto(piece.file);
          return (
            <View
              key={index}
              style={{
                ...style.layoutSquareItem,
                height: '45%',
              }}>
              {piece.file.uri ? (
                <TouchableOpacity onPress={handleEditPhoto}>
                  <GeneralImage
                    styleImg={style.basicLayoutItem}
                    uri={piece.file.uri}
                    base64={piece.file.base64}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.selectImageWrapper}
                  onPress={handleShowListImage}>
                  <View style={style.wrapperIcon}>
                    <Icon name="plus" size={15} color={colores.verde} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      <View style={(style.layoutLargeItem, {width: '50%', marginBottom: 10})}>
        {secondColumnPiece.file.uri ? (
          <TouchableOpacity onPress={handleEditPhotoSecondColumn}>
            <GeneralImage
              styleImg={style.basicLayoutItem}
              uri={secondColumnPiece.file.uri}
              base64={secondColumnPiece.file.base64}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={style.selectImageWrapper}
            onPress={handleShowListImage}>
            <View style={style.wrapperIcon}>
              <Icon name="plus" size={15} color={colores.verde} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const FiveCartLayout = ({getSelectedImages, onShowListImage, onEditPhoto}) => {
  const pieces = getSelectedImages(4);

  const firstColumnPieces = pieces.slice(0, 2);
  const secondColumnPieces = pieces.slice(2, 4);
  const offsetSelectImg = pieces.filter((piece) => isNull(piece.file.uri))
    .length;

  const handleShowListImage = () =>
    onShowListImage(offsetSelectImg, offsetSelectImg);

  return (
    <View style={style.layoutTwoColumnsContainer}>
      <View style={(style.layoutLargeItem, {width: '45%'})}>
        {firstColumnPieces.map((piece, index) => {
          const handleEditPhoto = () => onEditPhoto(piece.file);
          return (
            <View
              key={index}
              style={{
                ...style.layoutSquareItem,
                height: '45%',
              }}>
              {piece.file.uri ? (
                <TouchableOpacity onPress={handleEditPhoto}>
                  <GeneralImage
                    styleImg={style.basicLayoutItem}
                    uri={piece.file.uri}
                    base64={piece.file.base64}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.selectImageWrapper}
                  onPress={handleShowListImage}>
                  <View style={style.wrapperIcon}>
                    <Icon name="plus" size={15} color={colores.verde} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      <View style={(style.layoutLargeItem, {width: '45%'})}>
        {secondColumnPieces.map((piece, index) => {
          const handleEditPhoto = () => onEditPhoto(piece.file);

          return (
            <View
              key={index}
              style={{
                ...style.layoutSquareItem,
                height: '45%',
              }}>
              {piece.file.uri ? (
                <TouchableOpacity onPress={handleEditPhoto}>
                  <GeneralImage
                    styleImg={style.basicLayoutItem}
                    uri={piece.file.uri}
                    base64={piece.file.base64}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.selectImageWrapper}
                  onPress={handleShowListImage}>
                  <View style={style.wrapperIcon}>
                    <Icon name="plus" size={15} color={colores.verde} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const EditCartLayoutCover = ({
  selectedLayout,
  selectedPage,
  onShowListImage,
  onEditPhoto,
}) => {
  const getSelectedImages = (amountImagesNeeded) => {
    if (selectedPage.pieces.length < amountImagesNeeded) {
      const images = selectedPage.pieces.slice(0, amountImagesNeeded);
      const totalSpace = amountImagesNeeded - selectedPage.pieces.length;

      const fillEmptySpace = fill(Array(totalSpace), {
        file: {uri: null, base64: null},
      });
      const imagesSelected = concat(images, fillEmptySpace);

      return imagesSelected;
    }

    return selectedPage.pieces.slice(0, amountImagesNeeded);
  };
  const renderLayout = (layoutId) => {
    if (layoutId === 1) {
      return (
        <BasicCartLayout
          onShowListImage={onShowListImage}
          onEditPhoto={onEditPhoto}
          getSelectedImages={getSelectedImages}
        />
      );
    } else if (layoutId === 2) {
      return (
        <TwoCartLayout
          onShowListImage={onShowListImage}
          onEditPhoto={onEditPhoto}
          getSelectedImages={getSelectedImages}
        />
      );
    } else if (layoutId === 3) {
      return (
        <ThreeCartLayout
          onShowListImage={onShowListImage}
          onEditPhoto={onEditPhoto}
          getSelectedImages={getSelectedImages}
        />
      );
    } else if (layoutId === 4) {
      return (
        <FourthCartLayout
          onShowListImage={onShowListImage}
          onEditPhoto={onEditPhoto}
          getSelectedImages={getSelectedImages}
        />
      );
    } else if (layoutId === 5) {
      return (
        <FiveCartLayout
          onShowListImage={onShowListImage}
          onEditPhoto={onEditPhoto}
          getSelectedImages={getSelectedImages}
        />
      );
    }
  };
  return (
    <View style={style.mainContainer}>
      <View style={style.container}>{renderLayout(selectedLayout)}</View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
  },
  container: {
    height: 230,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colores.grisFormatoAlbum,
    backgroundColor: colores.blanco,
  },
  basicLayoutItem: {
    height: '100%',
    width: '100%',
  },
  layoutLargeItem: {
    height: '100%',
    width: '45%',
    marginHorizontal: 2,
  },
  layoutSquareItem: {
    height: 60,
    width: '100%',
    marginBottom: 10,
  },
  layoutTwoColumnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectImageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisWrapperImage,
  },
  wrapperIcon: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colores.verde,
    backgroundColor: colores.blanco,
  },
});

export default EditCartLayoutCover;
