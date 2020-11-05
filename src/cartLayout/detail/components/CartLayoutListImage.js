import React, {PureComponent, createRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Animated,
  View,
  Alert,
  TouchableHighlight,
  PanResponder,
  Dimensions,
} from 'react-native';
import concat from 'lodash/concat';
import isNull from 'lodash/isNull';
import fill from 'lodash/fill';
import CartLayoutCover from './CartLayoutCover';
import CartLayoutImage from './CartLayoutImage';
import Icon from 'react-native-vector-icons/dist/Feather';
import GeneralImage from '../../../generales/GeneralImage';
import CartLayoutWrapper from './CartLayoutWrapper';
import {colores} from '../../../constantes/Temas';

class CartLayoutListImage extends PureComponent {
  point = new Animated.ValueXY();
  currentY = 0;
  currentX = 0;
  scrollOffset = 0;
  flatlistTopOffset = 0;
  flatlistHeight = 0;
  flatlistRef = createRef();
  rowHeight = 0;
  rowWidth = 0;
  headerHeight = 0;
  currentIdx = -1;
  newIdx = -1;
  active = false;
  timeoutId = null;
  moveTimeOutId = null;
  editItemTimoutId = null;

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      draggingIdx: -1,
      pages: props.cart.pages,
      piece: {
        position: null,
        pageNumber: null,
        file: {},
      },
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.currentY = gestureState.y0;
        this.currentX = gestureState.x0;
        const row = this.getRow(this.currentY);
        const column = this.getColumn(this.currentX, 30);
        const xStart = column < 1 ? 0 : this.rowWidth;

        Animated.event([{y: this.point.y, x: this.point.x}], {
          useNativeDriver: false,
        })(
          {
            y: gestureState.y0 - this.rowHeight / 2,
            x: xStart,
          },
          {},
        );

        this.timeoutId = setTimeout(() => {
          this.currentIdx = this.getCurrentIndex(row, column);
          this.active = true;
          this.setState({
            ...this.state,
            dragging: true,
            draggingIdx: this.currentIdx,
          });
        }, 300);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.currentY = gestureState.moveY;
        this.currentX = gestureState.moveX;

        if (this.active) {
          this.moveTimeOutId = setTimeout(() => {
            Animated.event([{y: this.point.y, x: this.point.x}], {
              useNativeDriver: false,
            })(
              {
                y: this.currentY - this.rowHeight / 2,
                x: this.currentX,
              },
              {},
            );
          }, 100);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        this.reset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.reset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }

  componentDidUpdate(prevProps) {
    const {cart} = this.props;
    const {dragging} = this.state;

    if (dragging) {
      this.animateList();
    } else {
      this.handleChangePage();
    }

    if (prevProps.cart !== cart) {
      this.setState({...this.state, pages: cart.pages});
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    clearTimeout(this.moveTimeOutId);
    clearTimeout(this.editItemTimoutId);
  }

  handleSelectPieceItem = (page, position) => {
    clearTimeout(this.editItemTimoutId);

    this.editItemTimoutId = setTimeout(() => {
      const piece = {
        position,
        pageNumber: page.number,
        file: page.pieces[position].file,
      };

      this.setState({...this.state, piece});
    }, 70);
  };

  handleChangePage = () => {
    if (
      this.newIdx >= 0 &&
      this.currentIdx >= 0 &&
      this.newIdx !== this.currentIdx
    ) {
      const {piece} = this.state;

      if (isNull(piece.position)) {
        this.handleChangeFullPiece();
      } else {
        this.handleAddPiece();
      }

      this.resetPiece();
    }

    this.newIdx = -1;
    this.currentIdx = -1;
  };

  handleAddPiece = () => {
    const {onSavePages} = this.props;
    const {pages, piece} = this.state;
    const pageFrom = pages[this.currentIdx];
    const pageTo = pages[this.newIdx];
    const newPages = pages.map((page) => ({...page}));
    const allPiecesFrom = pageFrom.pieces.map((piece) => ({...piece}));
    const allPiecesTo = pageTo.pieces.map((piece) => ({...piece}));

    if (allPiecesTo.length === 4) {
      Alert.alert('No puedes agregar más piezas :C');
    } else {
      allPiecesTo.unshift({file: piece.file});
      allPiecesFrom.splice(piece.position, 1);

      const allPiecesToFilled = this.fillEmptySpace(
        pageTo.layout_id,
        allPiecesTo,
      );

      const layoutId = this.getLayoutId(pageTo.layout_id, allPiecesToFilled);
      const newPieces = this.orderPieces(allPiecesTo);
      newPages[this.newIdx].layout_id = layoutId;
      newPages[this.newIdx].pieces = newPieces;

      if (allPiecesFrom.length === 0) {
        newPages[this.currentIdx].pieces = [];
      } else {
        const layoutIdFrom = this.getLayoutId(
          pageFrom.layout_id,
          allPiecesFrom,
        );

        newPages[this.currentIdx].layout_id = layoutIdFrom;
        newPages[this.currentIdx].pieces = this.orderPieces(allPiecesFrom);
      }

      onSavePages(newPages);
    }
  };

  fillEmptySpace = (layoutId, pieces) => {
    let totalSpace = layoutId;

    if (layoutId === 3 || layoutId === 5) {
      totalSpace = 4;
    } else if (layoutId === 4) {
      totalSpace = 3;
    }

    if (pieces.length < totalSpace) {
      const totalEmpty = totalSpace - pieces.length;
      const fillEmptySpace = fill(Array(totalEmpty), {
        file: null,
      });

      return concat(pieces, fillEmptySpace);
    }
    return pieces;
  };

  orderPieces = (pieces) =>
    pieces.map((piece, index) => ({...piece, order: index}));

  getLayoutId = (currentLayoutId, pieces) => {
    const totalPiecesLayout = pieces.length;

    let layoutId = totalPiecesLayout;

    if (totalPiecesLayout === 3) {
      layoutId = 4;
    } else if (totalPiecesLayout === 4 && currentLayoutId === 3) {
      layoutId = 3;
    } else if (totalPiecesLayout === 4) {
      layoutId = 5;
    }

    return layoutId;
  };

  handleChangeFullPiece = () => {
    const {onSavePages} = this.props;
    const {pages} = this.state;
    const pageFrom = pages[this.currentIdx];
    const pageTo = pages[this.newIdx];
    const newPages = pages.map((page) => ({...page}));

    newPages[this.currentIdx] = {
      ...pageFrom,
      layout_id: pageTo.layout_id,
      pieces: pageTo.pieces.map((piece) => ({...piece})),
    };

    newPages[this.newIdx] = {
      ...pageTo,
      layout_id: pageFrom.layout_id,
      pieces: pageFrom.pieces.map((piece) => ({...piece})),
    };

    onSavePages(newPages);
  };

  animateList = () => {
    const {pages} = this.state;

    if (!this.active) {
      return;
    }

    requestAnimationFrame(() => {
      if (this.currentY + 100 > Dimensions.get('window').height) {
        this.flatlistRef.current.scrollToOffset({
          offset: this.scrollOffset + 20,
          animated: false,
        });
      } else if (this.currentY < 100) {
        this.flatlistRef.current.scrollToOffset({
          offset: this.scrollOffset - 20,
          animated: false,
        });
      }

      const row = this.getRow(this.currentY);
      const column = this.getColumn(this.currentX);

      const movedIndex = this.getCurrentIndex(row, column);

      if (movedIndex >= 0 && movedIndex <= pages.length) {
        this.newIdx = movedIndex;
      } else {
        this.newIdx = this.currentIdx;
      }

      this.animateList();
    });
  };

  reset = () => {
    this.active = false;
    this.currentY = 0;
    this.currentX = 0;
    this.setState({...this.state, dragging: false, draggingIdx: -1});
    clearTimeout(this.timeoutId);
    clearTimeout(this.moveTimeOutId);
    clearTimeout(this.editItemTimoutId);
  };

  resetPiece = () => {
    const {piece} = this.state;

    if (!isNull(piece.position)) {
      this.setState({
        ...this.state,
        piece: {
          position: null,
          pageNumber: null,
          file: {},
        },
      });
    }
  };

  handleLayoutFlatlist = (e) => {
    this.flatlistHeight = e.nativeEvent.layout.height;
    this.flatlistTopOffset = e.nativeEvent.layout.y + this.headerHeight;
  };

  handleOnScroll = (e) => {
    this.scrollOffset = e.nativeEvent.contentOffset.y;
  };

  handleOnRowSize = (e) => {
    this.rowWidth = e.nativeEvent.layout.width;
    this.rowHeight = e.nativeEvent.layout.height;
  };

  handleOnHeaderHeight = (e) => {
    this.headerHeight = e.nativeEvent.layout.height;
  };

  handleAddPage = (numberPage) => {
    const {onSavePages} = this.props;
    const {pages} = this.state;

    const defaultPage = {
      layout_id: null,
      number: numberPage,
      pieces: [],
    };

    const selectedPages = concat(pages);
    selectedPages.splice(numberPage, 0, defaultPage);

    const orderedPages = selectedPages.map((page, index) => ({
      ...page,
      number: index,
    }));

    onSavePages(orderedPages);
  };

  handleDeletePage = (numberPage) => {
    const {onSavePages} = this.props;
    const {pages} = this.state;

    const selectedPages = pages
      .filter((page) => page.number !== numberPage)
      .map((page, index) => ({
        ...page,
        number: index,
      }));

    onSavePages(selectedPages);
  };

  getRow = (y) => {
    const row = Math.floor(
      (this.scrollOffset + y - this.flatlistTopOffset) / this.rowHeight,
    );

    return row;
  };

  getColumn = (x, extraSpace = 0) => {
    const width = this.rowWidth + extraSpace;
    return x < width ? 0 : 1;
  };

  getCurrentIndex = (row, column) => {
    const firstColumnIndex = row * 2;
    const secondColumnIndex = firstColumnIndex + 1;

    return column === 0 ? firstColumnIndex : secondColumnIndex;
  };

  renderSeparator = ({leadingItem}) => {
    const handleOnPress = () => {
      this.handleAddPage(leadingItem[1].number);
    };

    return (
      <View style={{marginLeft: 4}}>
        <TouchableHighlight
          underlayColor={'rgba(255, 255, 255, 0.7)'}
          activeOpacity={0.2}
          style={style.cartLayoutIconContainer}
          onPress={handleOnPress}>
          <Icon name="plus" size={15} color={colores.verde} />
        </TouchableHighlight>
      </View>
    );
  };

  renderPages = ({item: page}) => {
    const {onGoToEditCartImage} = this.props;

    return (
      <CartLayoutImage
        page={page}
        panResponder={this._panResponder}
        onGoToEditCartImage={onGoToEditCartImage}
        onDeletePage={this.handleDeletePage}
        onSelectPieceItem={this.handleSelectPieceItem}
        onResetPieceItem={this.resetPiece}
        onRowHeight={this.handleOnRowSize}
      />
    );
  };

  render() {
    const {pages, dragging, draggingIdx} = this.state;
    const {piece} = this.state;

    return (
      <>
        {dragging && (
          <Animated.View
            style={{
              ...style.cartLayoutImageAnimatedContainer,
              transform: [
                {translateX: this.point.getLayout().left},
                {translateY: this.point.getLayout().top},
              ],
            }}>
            {isNull(piece.pageNumber) ? (
              <CartLayoutWrapper page={pages[draggingIdx]} />
            ) : (
              <GeneralImage
                uri={pages[draggingIdx].pieces[piece.position].file}
                styleImg={style.cartLayoutImageSize}
              />
            )}
          </Animated.View>
        )}
        <FlatList
          scrollEnabled={!dragging}
          contentContainerStyle={style.listContainer}
          ListHeaderComponent={
            <CartLayoutCover
              piece={pages[0].pieces[0]}
              onHeaderHeight={this.handleOnHeaderHeight}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          onScroll={this.handleOnScroll}
          onLayout={this.handleLayoutFlatlist}
          scrollEventThrottle={16}
          data={pages}
          numColumns={2}
          renderItem={this.renderPages}
          keyExtractor={(page) => page.number.toString()}
          ref={this.flatlistRef}
        />
      </>
    );
  }
}

const style = StyleSheet.create({
  listContainer: {
    position: 'relative',
    marginTop: 35,
    paddingTop: 5,
    paddingBottom: 30,
    paddingHorizontal: 12,
  },
  cartLayoutImageAnimatedContainer: {
    position: 'absolute',
    height: 100,
    width: '50%',
    backgroundColor: colores.blanco,
    opacity: 0.8,
    elevation: 999,
    zIndex: 998,
  },
  cartLayoutImageSize: {
    width: '50%',
    height: 100,
    alignSelf: 'center',
  },
  cartLayoutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 1,
  },
  cartLayoutIconContainer: {
    position: 'absolute',
    bottom: 35,
    width: 25,
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 999,
    zIndex: 999,
  },
});

export default CartLayoutListImage;
