import React, {Component} from 'react';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import isNull from 'lodash/isNull';
import concat from 'lodash/concat';
import fill from 'lodash/fill';
import {colores} from '../../../constantes/Temas';
import GeneralImage from '../../../generales/GeneralImage';

const BasicLayout = ({
  getSelectedImages,
  panResponder,
  onPressImage,
  onSelectImage,
}) => {
  const pieces = getSelectedImages(1);
  const piece = pieces[0];

  const handleResponder = (evt) => {
    if (!isNull(piece.file.uri)) {
      onSelectImage(0);
      panResponder.panHandlers.onResponderGrant(evt);
    }
  };

  return (
    <View
      {...panResponder.panHandlers}
      onResponderGrant={handleResponder}
      style={style.basicWrapper}>
      <TouchableHighlight onPress={onPressImage}>
        <GeneralImage
          base64={piece.file.base64}
          uri={piece.file.base64}
          styleImg={style.imageSize}
        />
      </TouchableHighlight>
    </View>
  );
};

const TwoLayouts = ({
  getSelectedImages,
  panResponder,
  onPressImage,
  onSelectImage,
}) => {
  const pieces = getSelectedImages(2);

  return (
    <View style={style.twoColumnsWrapper}>
      {pieces.map((piece, index) => {
        const handleResponder = (evt) => {
          if (!isNull(piece.file.uri)) {
            onSelectImage(index);
            panResponder.panHandlers.onResponderGrant(evt);
          }
        };

        return (
          <View
            {...panResponder.panHandlers}
            style={style.largeWrapper}
            key={piece.order.toString()}
            onResponderGrant={handleResponder}>
            <TouchableHighlight onPress={onPressImage}>
              <GeneralImage
                base64={piece.file.base64}
                uri={piece.file.uri}
                styleImg={style.imageSize}
              />
            </TouchableHighlight>
          </View>
        );
      })}
    </View>
  );
};

const ThirdLayout = ({
  getSelectedImages,
  panResponder,
  onPressImage,
  onSelectImage,
}) => {
  const pieces = getSelectedImages(4);
  const firstColumnPiece = pieces[0];
  const secondColumnPieces = pieces.slice(1, 4);

  const handleFirstPieceResponder = (evt) => {
    if (!isNull(firstColumnPiece.file.uri)) {
      onSelectImage(0);
      panResponder.panHandlers.onResponderGrant(evt);
    }
  };

  return (
    <View style={style.twoColumnsWrapper}>
      <View
        {...panResponder.panHandlers}
        onResponderGrant={handleFirstPieceResponder}
        style={style.largeWrapper}>
        <TouchableHighlight onPress={onPressImage}>
          <GeneralImage
            base64={firstColumnPiece.file.base64}
            uri={firstColumnPiece.file.uri}
            styleImg={style.imageSize}
          />
        </TouchableHighlight>
      </View>
      <View style={style.largeWrapper}>
        {secondColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file.uri)) {
              onSelectImage(index + 1);
              panResponder.panHandlers.onResponderGrant(evt);
            }
          };

          return (
            <View
              key={piece.order.toString()}
              style={style.minWrapper}
              {...panResponder.panHandlers}
              onResponderGrant={handleResponder}>
              <TouchableHighlight onPress={onPressImage}>
                <GeneralImage
                  base64={piece.file.base64}
                  uri={piece.file.uri}
                  styleImg={style.imageSize}
                />
              </TouchableHighlight>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const FourthLayout = ({
  getSelectedImages,
  panResponder,
  onPressImage,
  onSelectImage,
}) => {
  const pieces = getSelectedImages(3);
  const firstColumnPieces = pieces.slice(1, 3);
  const secondColumnPiece = pieces[0];

  const handleFirstPieceResponder = (evt) => {
    if (!isNull(secondColumnPiece.file.uri)) {
      onSelectImage(0);
      panResponder.panHandlers.onResponderGrant(evt);
    }
  };

  return (
    <View style={style.twoColumnsWrapper}>
      <View style={style.largeWrapper}>
        {firstColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file.uri)) {
              onSelectImage(index + 1);
              panResponder.panHandlers.onResponderGrant(evt);
            }
          };

          return (
            <View
              key={piece.order.toString()}
              style={style.squareWrapper}
              {...panResponder.panHandlers}
              onResponderGrant={handleResponder}>
              <TouchableHighlight onPress={onPressImage}>
                <GeneralImage
                  base64={piece.file.base64}
                  uri={piece.file.uri}
                  styleImg={style.imageSize}
                />
              </TouchableHighlight>
            </View>
          );
        })}
      </View>
      <View
        style={style.largeWrapper}
        {...panResponder.panHandlers}
        onResponderGrant={handleFirstPieceResponder}>
        <TouchableHighlight onPress={onPressImage}>
          <GeneralImage
            base64={secondColumnPiece.file.base64}
            uri={secondColumnPiece.file.uri}
            styleImg={style.imageSize}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const FifthLayout = ({
  getSelectedImages,
  panResponder,
  onPressImage,
  onSelectImage,
}) => {
  const pieces = getSelectedImages(4);
  const firstColumnPieces = pieces.slice(0, 2);
  const secondColumnPieces = pieces.slice(2, 4);

  return (
    <View style={style.twoColumnsWrapper}>
      <View style={style.largeWrapper}>
        {firstColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file.uri)) {
              onSelectImage(index);
              panResponder.panHandlers.onResponderGrant(evt);
            }
          };

          return (
            <View
              key={piece.order.toString()}
              style={style.squareWrapper}
              {...panResponder.panHandlers}
              onResponderGrant={handleResponder}>
              <TouchableHighlight onPress={onPressImage}>
                <GeneralImage
                  base64={piece.file.base64}
                  uri={piece.file.uri}
                  styleImg={style.imageSize}
                />
              </TouchableHighlight>
            </View>
          );
        })}
      </View>
      <View style={style.largeWrapper}>
        {secondColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file.uri)) {
              onSelectImage(index + 2);
              panResponder.panHandlers.onResponderGrant(evt);
            }
          };

          return (
            <View
              key={piece.order.toString()}
              style={style.squareWrapper}
              {...panResponder.panHandlers}
              onResponderGrant={handleResponder}>
              <TouchableHighlight onPress={onPressImage}>
                <GeneralImage
                  base64={piece.file.base64}
                  uri={piece.file.uri}
                  styleImg={style.imageSize}
                />
              </TouchableHighlight>
            </View>
          );
        })}
      </View>
    </View>
  );
};

class CartLayoutWrapper extends Component {
  getSelectedImages = (amountImagesNeeded) => {
    const {page} = this.props;

    if (page.pieces.length < amountImagesNeeded) {
      const currentPieces = page.pieces.slice(0, amountImagesNeeded);

      const totalEmpty = amountImagesNeeded - page.pieces.length;
      const fillEmptySpace = fill(Array(totalEmpty), {
        file: {
          base64: null,
          uri: null,
        },
      });

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

  renderWrapper = () => {
    const {onPressImage, onSelectPieceItem, page, panResponder} = this.props;
    const {layout_id: layoutId} = page;

    const handleSelectImage = (index) => onSelectPieceItem(page, index);

    if (isNull(layoutId) || layoutId === 1) {
      return (
        <BasicLayout
          getSelectedImages={this.getSelectedImages}
          onPressImage={onPressImage}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 2) {
      return (
        <TwoLayouts
          getSelectedImages={this.getSelectedImages}
          onPressImage={onPressImage}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 3) {
      return (
        <ThirdLayout
          getSelectedImages={this.getSelectedImages}
          onPressImage={onPressImage}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 4) {
      return (
        <FourthLayout
          getSelectedImages={this.getSelectedImages}
          onPressImage={onPressImage}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 5) {
      return (
        <FifthLayout
          getSelectedImages={this.getSelectedImages}
          onPressImage={onPressImage}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    }
  };

  render() {
    return <View style={style.mainWrapper}>{this.renderWrapper()}</View>;
  }
}

CartLayoutWrapper.defaultProps = {
  onPressImage: () => {},
  onSelectPieceItem: () => {},
  panResponder: {},
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
