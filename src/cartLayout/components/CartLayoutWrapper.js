import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colores} from '../../constantes/Temas';
import isNull from 'lodash/isNull';
import concat from 'lodash/concat';
import fill from 'lodash/fill';

const defaultImg = require('../../assets/img/default.jpg');

const BasicLayout = ({getSelectedImages, onPressImage}) => {
  const pieces = getSelectedImages(1);
  const piece = pieces[0];

  return (
    <TouchableOpacity style={style.basicWrapper} onPress={onPressImage}>
      <Image
        style={style.imageSize}
        source={
          isNull(piece.file)
            ? defaultImg
            : {uri: `data:image/gif;base64,${piece.file}`}
        }
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const TwoLayouts = ({getSelectedImages, onPressImage}) => {
  const pieces = getSelectedImages(2);

  return (
    <View style={style.twoColumnsWrapper}>
      {pieces.map((piece) => {
        return (
          <TouchableOpacity
            style={style.largeWrapper}
            onPress={onPressImage}
            key={piece.order.toString()}>
            <Image
              style={style.imageSize}
              source={
                isNull(piece.file)
                  ? defaultImg
                  : {uri: `data:image/gif;base64,${piece.file}`}
              }
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ThirdLayout = ({getSelectedImages, onPressImage}) => {
  const pieces = getSelectedImages(4);
  const firstColumnPiece = pieces[0];
  const secondColumnPieces = pieces.slice(1, 4);

  return (
    <View style={style.twoColumnsWrapper}>
      <TouchableOpacity style={style.largeWrapper} onPress={onPressImage}>
        <Image
          style={style.imageSize}
          source={
            isNull(firstColumnPiece.file)
              ? defaultImg
              : {uri: `data:image/gif;base64,${firstColumnPiece.file}`}
          }
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={style.largeWrapper}>
        {secondColumnPieces.map((piece) => (
          <TouchableOpacity
            style={style.minWrapper}
            onPress={onPressImage}
            key={piece.order.toString()}>
            <Image
              style={style.imageSize}
              source={
                isNull(piece.file)
                  ? defaultImg
                  : {uri: `data:image/gif;base64,${piece.file}`}
              }
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const FourthLayout = ({getSelectedImages, onPressImage}) => {
  const pieces = getSelectedImages(3);
  const firstColumnPieces = pieces.slice(1, 3);
  const secondColumnPiece = pieces[0];

  return (
    <View style={style.twoColumnsWrapper}>
      <View style={style.largeWrapper}>
        {firstColumnPieces.map((piece) => (
          <TouchableOpacity
            style={style.squareWrapper}
            onPress={onPressImage}
            key={piece.order.toString()}>
            <Image
              style={style.imageSize}
              source={
                isNull(piece.file)
                  ? defaultImg
                  : {uri: `data:image/gif;base64,${piece.file}`}
              }
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={style.largeWrapper} onPress={onPressImage}>
        <Image
          style={style.imageSize}
          source={
            isNull(secondColumnPiece.file)
              ? defaultImg
              : {uri: `data:image/gif;base64,${secondColumnPiece.file}`}
          }
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const FifthLayout = ({getSelectedImages, onPressImage}) => {
  const pieces = getSelectedImages(4);
  const firstColumnPieces = pieces.slice(0, 2);
  const secondColumnPieces = pieces.slice(2, 4);

  return (
    <View style={style.twoColumnsWrapper}>
      <View style={style.largeWrapper}>
        {firstColumnPieces.map((piece) => (
          <TouchableOpacity
            style={style.squareWrapper}
            onPress={onPressImage}
            key={piece.order.toString()}>
            <Image
              style={style.imageSize}
              source={
                isNull(piece.file)
                  ? defaultImg
                  : {uri: `data:image/gif;base64,${piece.file}`}
              }
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={style.largeWrapper}>
        {secondColumnPieces.map((piece) => (
          <TouchableOpacity
            style={style.squareWrapper}
            onPress={onPressImage}
            key={piece.order.toString()}>
            <Image
              style={style.imageSize}
              source={
                isNull(piece.file)
                  ? defaultImg
                  : {uri: `data:image/gif;base64,${piece.file}`}
              }
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const CartLayoutWrapper = ({page, onPressImage}) => {
  const getSelectedImages = (amountImagesNeeded) => {
    if (page.pieces.length < amountImagesNeeded) {
      const currentPieces = page.pieces.slice(0, amountImagesNeeded);

      const totalEmpty = amountImagesNeeded - page.pieces.length;
      const fillEmptySpace = fill(Array(totalEmpty), {file: null});

      const piecesSelected = concat(currentPieces, fillEmptySpace).map(
        (piece, index) => ({
          ...piece,
          order: index,
        }),
      );

      return piecesSelected;
    }

    return page.pieces.slice(0, amountImagesNeeded);
  };

  const renderWrapper = () => {
    const {layout_id: layoutId, pieces} = page;

    if (isNull(layoutId) || layoutId === 1) {
      return (
        <BasicLayout
          getSelectedImages={getSelectedImages}
          onPressImage={onPressImage}
        />
      );
    } else if (layoutId === 2) {
      return (
        <TwoLayouts
          getSelectedImages={getSelectedImages}
          onPressImage={onPressImage}
        />
      );
    } else if (layoutId === 3) {
      return (
        <ThirdLayout
          getSelectedImages={getSelectedImages}
          onPressImage={onPressImage}
        />
      );
    } else if (layoutId === 4) {
      return (
        <FourthLayout
          getSelectedImages={getSelectedImages}
          onPressImage={onPressImage}
        />
      );
    } else if (layoutId === 5) {
      return (
        <FifthLayout
          getSelectedImages={getSelectedImages}
          onPressImage={onPressImage}
        />
      );
    }
  };

  return <View style={style.mainWrapper}>{renderWrapper()}</View>;
};

const style = StyleSheet.create({
  mainWrapper: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  basicWrapper: {
    paddingVertical: 3,

    height: 100,
    width: '50%',
  },
  largeWrapper: {
    height: '100%',
    width: '46%',
    marginHorizontal: 3,
  },
  minWrapper: {
    height: '30%',
    width: '100%',
    marginBottom: 5,
  },
  squareWrapper: {
    height: '50%',
    width: '100%',
    marginBottom: 2,
  },
  twoColumnsWrapper: {
    paddingVertical: 3,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageSize: {
    width: '100%',
    height: '100%',
  },
});
export default CartLayoutWrapper;