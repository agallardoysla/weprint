import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import isNull from 'lodash/isNull';
import concat from 'lodash/concat';
import fill from 'lodash/fill';
import {colores} from '../../../constantes/Temas';
import GeneralImage from '../../../generales/GeneralImage';

const BasicLayout = ({getSelectedImages, panResponder, onSelectImage}) => {
  const pieces = getSelectedImages(1);
  const piece = pieces[0];

  const handleResponder = (evt) => {
    if (!isNull(piece.file)) {
      onSelectImage(0);
      panResponder.panHandlers.onResponderGrant(evt);
    }
  };

  return (
    <>
      <View
        {...panResponder.panHandlers}
        style={style.basicWrapper}
        onResponderGrant={handleResponder}>
        <GeneralImage uri={piece.file} styleImg={style.imageSize} />
      </View>
    </>
  );
};

const TwoLayouts = ({getSelectedImages, panResponder, onSelectImage}) => {
  const pieces = getSelectedImages(2);

  return (
    <View style={style.twoColumnsWrapper}>
      {pieces.map((piece, index) => {
        const handleResponder = (evt) => {
          if (!isNull(piece.file)) {
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
            <GeneralImage uri={piece.file} styleImg={style.imageSize} />
          </View>
        );
      })}
    </View>
  );
};

const ThirdLayout = ({getSelectedImages, panResponder, onSelectImage}) => {
  const pieces = getSelectedImages(4);
  const firstColumnPiece = pieces[0];
  const secondColumnPieces = pieces.slice(1, 4);

  const handleFirstPieceResponder = (evt) => {
    if (!isNull(firstColumnPiece.file)) {
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
        <GeneralImage uri={firstColumnPiece.file} styleImg={style.imageSize} />
      </View>
      <View style={style.largeWrapper}>
        {secondColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file)) {
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
              <GeneralImage uri={piece.file} styleImg={style.imageSize} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const FourthLayout = ({getSelectedImages, panResponder, onSelectImage}) => {
  const pieces = getSelectedImages(3);
  const firstColumnPieces = pieces.slice(1, 3);
  const secondColumnPiece = pieces[0];

  const handleFirstPieceResponder = (evt) => {
    if (!isNull(secondColumnPiece.file)) {
      onSelectImage(0);
      panResponder.panHandlers.onResponderGrant(evt);
    }
  };

  return (
    <View style={style.twoColumnsWrapper}>
      <View style={style.largeWrapper}>
        {firstColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file)) {
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
              <GeneralImage uri={piece.file} styleImg={style.imageSize} />
            </View>
          );
        })}
      </View>
      <View
        style={style.largeWrapper}
        {...panResponder.panHandlers}
        onResponderGrant={handleFirstPieceResponder}>
        <GeneralImage uri={secondColumnPiece.file} styleImg={style.imageSize} />
      </View>
    </View>
  );
};

const FifthLayout = ({getSelectedImages, panResponder, onSelectImage}) => {
  const pieces = getSelectedImages(4);
  const firstColumnPieces = pieces.slice(0, 2);
  const secondColumnPieces = pieces.slice(2, 4);

  return (
    <View style={style.twoColumnsWrapper}>
      <View style={style.largeWrapper}>
        {firstColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file)) {
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
              <GeneralImage uri={piece.file} styleImg={style.imageSize} />
            </View>
          );
        })}
      </View>
      <View style={style.largeWrapper}>
        {secondColumnPieces.map((piece, index) => {
          const handleResponder = (evt) => {
            if (!isNull(piece.file)) {
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
              <GeneralImage uri={piece.file} styleImg={style.imageSize} />
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
        file: null,
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
    const {onSelectPieceItem, page, panResponder} = this.props;
    const {layout_id: layoutId} = page;

    const handleSelectImage = (index) => onSelectPieceItem(page, index);

    if (isNull(layoutId) || layoutId === 1) {
      return (
        <BasicLayout
          getSelectedImages={this.getSelectedImages}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 2) {
      return (
        <TwoLayouts
          getSelectedImages={this.getSelectedImages}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 3) {
      return (
        <ThirdLayout
          getSelectedImages={this.getSelectedImages}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 4) {
      return (
        <FourthLayout
          getSelectedImages={this.getSelectedImages}
          onSelectImage={handleSelectImage}
          panResponder={panResponder}
        />
      );
    } else if (layoutId === 5) {
      return (
        <FifthLayout
          getSelectedImages={this.getSelectedImages}
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
