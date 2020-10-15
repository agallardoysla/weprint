import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import fill from 'lodash/fill';
import concat from 'lodash/concat';
import {colores} from '../../constantes/Temas';

const BasicCartLayout = ({selectedPage, onShowListImage}) => {
  const {pieces} = selectedPage;
  const handleShowListImage = () => onShowListImage();

  return (
    <>
      <View style={style.basicLayoutItem}>
        {pieces.length ? (
          <Image
            style={style.basicLayoutItem}
            source={{
              uri: `data:image/gif;base64,${pieces[0].file}`,
            }}
            resizeMode="cover"
          />
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

const TwoCartLayout = ({selectedPage, onShowListImage, getSelectedImages}) => {
  const {pieces} = selectedPage;
  const selectedPieces = getSelectedImages(pieces, 2);
  const handleShowListImage = () => onShowListImage();

  return (
    <View style={style.layoutTwoColumnsContainer}>
      {selectedPieces.map((piece, index) => (
        <View style={style.layoutLargeItem} key={index}>
          {piece.file ? (
            <Image
              style={style.basicLayoutItem}
              source={{
                uri: `data:image/gif;base64,${piece.file}`,
              }}
              resizeMode="cover"
            />
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
      ))}
    </View>
  );
};

const ThreeCartLayout = ({
  selectedPage,
  onShowListImage,
  getSelectedImages,
}) => {
  const {pieces} = selectedPage;
  const firstColumnPiece = pieces.length ? pieces[0] : {file: null};
  const secondColumnPieces = getSelectedImages(
    selectedPage.pieces.slice(1, 4),
    3,
  );

  return (
    <View style={style.layoutTwoColumnsContainer}>
      <View style={(style.layoutLargeItem, {width: '60%', marginBottom: 10})}>
        {firstColumnPiece.file ? (
          <Image
            style={style.basicLayoutItem}
            source={{
              uri: `data:image/gif;base64,${firstColumnPiece.file}`,
            }}
            resizeMode="cover"
          />
        ) : (
          <TouchableOpacity
            style={style.selectImageWrapper}
            onPress={onShowListImage}>
            <View style={style.wrapperIcon}>
              <Icon name="plus" size={15} color={colores.verde} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={(style.layoutLargeItem, {width: '35%'})}>
        {secondColumnPieces.map((piece, index) => (
          <View style={style.layoutSquareItem} key={index}>
            {piece.file ? (
              <Image
                style={style.basicLayoutItem}
                source={{
                  uri: `data:image/gif;base64,${piece.file}`,
                }}
                resizeMode="cover"
              />
            ) : (
              <TouchableOpacity
                style={style.selectImageWrapper}
                onPress={onShowListImage}>
                <View style={style.wrapperIcon}>
                  <Icon name="plus" size={15} color={colores.verde} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const FourthCartLayout = ({
  selectedPage,
  getSelectedImages,
  onShowListImage,
}) => {
  const {pieces} = selectedPage;

  const firstColumnPieces = getSelectedImages(pieces.slice(1, 3), 2);
  const secondColumnPiece = pieces.length ? pieces[0] : {file: null};

  return (
    <View style={style.layoutTwoColumnsContainer}>
      <View style={(style.layoutLargeItem, {width: '45%'})}>
        {firstColumnPieces.map((piece) => (
          <View
            style={{
              ...style.layoutSquareItem,
              height: '45%',
            }}>
            {piece.file ? (
              <Image
                style={style.basicLayoutItem}
                source={{
                  uri: `data:image/gif;base64,${piece.file}`,
                }}
                resizeMode="cover"
              />
            ) : (
              <TouchableOpacity
                style={style.selectImageWrapper}
                onPress={onShowListImage}>
                <View style={style.wrapperIcon}>
                  <Icon name="plus" size={15} color={colores.verde} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <View style={(style.layoutLargeItem, {width: '50%', marginBottom: 10})}>
        {secondColumnPiece.file ? (
          <Image
            style={style.basicLayoutItem}
            source={{
              uri: `data:image/gif;base64,${secondColumnPiece.file}`,
            }}
            resizeMode="cover"
          />
        ) : (
          <TouchableOpacity
            style={style.selectImageWrapper}
            onPress={onShowListImage}>
            <View style={style.wrapperIcon}>
              <Icon name="plus" size={15} color={colores.verde} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const FiveCartLayout = ({selectedPage, getSelectedImages, onShowListImage}) => {
  const {pieces} = selectedPage;
  const allPieces = getSelectedImages(pieces.slice(0, 2), 4);

  const firstColumnPieces = allPieces.slice(0, 2);
  const secondColumnPieces = allPieces.slice(2, 4);

  return (
    <View style={style.layoutTwoColumnsContainer}>
      <View style={(style.layoutLargeItem, {width: '45%'})}>
        {firstColumnPieces.map((piece) => (
          <View
            style={{
              ...style.layoutSquareItem,
              height: '45%',
            }}>
            {piece.file ? (
              <Image
                style={style.basicLayoutItem}
                source={{
                  uri: `data:image/gif;base64,${piece.file}`,
                }}
                resizeMode="cover"
              />
            ) : (
              <TouchableOpacity
                style={style.selectImageWrapper}
                onPress={onShowListImage}>
                <View style={style.wrapperIcon}>
                  <Icon name="plus" size={15} color={colores.verde} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <View style={(style.layoutLargeItem, {width: '45%'})}>
        {secondColumnPieces.map((piece) => (
          <View
            style={{
              ...style.layoutSquareItem,
              height: '45%',
            }}>
            {piece.file ? (
              <Image
                style={style.basicLayoutItem}
                source={{
                  uri: `data:image/gif;base64,${piece.file}`,
                }}
                resizeMode="cover"
              />
            ) : (
              <TouchableOpacity
                style={style.selectImageWrapper}
                onPress={onShowListImage}>
                <View style={style.wrapperIcon}>
                  <Icon name="plus" size={15} color={colores.verde} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const EditCartLayoutCover = ({
  selectedLayout,
  selectedPage,
  imagesAdded,
  onShowListImage,
}) => {
  const getSelectedImages = (pieces, maxCount) => {
    if (pieces.length < maxCount) {
      const offsetImg = maxCount - pieces.length;

      const images = imagesAdded
        .slice(0, offsetImg)
        .map((img) => ({file: img.base64}));

      const offsetSpace = maxCount - pieces.length - images.length;
      const fillEmptySpace = fill(Array(offsetSpace), {file: null});
      const imagesSelected = concat(images, fillEmptySpace);
      return concat(pieces, imagesSelected);
    }
    return pieces;
  };
  const renderLayout = (layoutId) => {
    if (layoutId === 1) {
      return (
        <BasicCartLayout
          onShowListImage={onShowListImage}
          selectedPage={selectedPage}
        />
      );
    } else if (layoutId === 2) {
      return (
        <TwoCartLayout
          onShowListImage={onShowListImage}
          getSelectedImages={getSelectedImages}
          selectedPage={selectedPage}
        />
      );
    } else if (layoutId === 3) {
      return (
        <ThreeCartLayout
          onShowListImage={onShowListImage}
          getSelectedImages={getSelectedImages}
          selectedPage={selectedPage}
        />
      );
    } else if (layoutId === 4) {
      return (
        <FourthCartLayout
          onShowListImage={onShowListImage}
          getSelectedImages={getSelectedImages}
          selectedPage={selectedPage}
        />
      );
    } else if (layoutId === 5) {
      return (
        <FiveCartLayout
          onShowListImage={onShowListImage}
          getSelectedImages={getSelectedImages}
          selectedPage={selectedPage}
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
