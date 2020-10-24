import React, {PureComponent, createRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  TouchableHighlight,
  PanResponder,
  Dimensions,
} from 'react-native';
import concat from 'lodash/concat';
import isNull from 'lodash/isNull';
import CartLayoutCover from './CartLayoutCover';
import CartLayoutImage from './CartLayoutImage';
import Icon from 'react-native-vector-icons/dist/Feather';
import orderBy from 'lodash/orderBy';
import CartLayoutWrapper from './CartLayoutWrapper';
import {colores} from '../../constantes/Temas';

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

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      draggingIdx: -1,
      pages: props.preSelectedCart.pages,
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

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
        }, 400);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.currentY = gestureState.moveY;
        this.currentX = gestureState.moveX;

        this.moveTimeOutId = setTimeout(() => {
          Animated.event([{y: this.point.y, x: this.point.x}], {
            useNativeDriver: false,
          })(
            {
              y: this.currentY,
              x: this.currentX,
            },
            {},
          );
        }, 100);
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
    const {preSelectedCart} = this.props;
    const {dragging} = this.state;

    if (dragging) {
      this.animateList();
    } else {
      this.handleChangePage();
    }

    if (prevProps.preSelectedCart !== preSelectedCart) {
      this.setState({...this.state, pages: preSelectedCart.pages});
    }
  }

  handleChangePage = () => {
    if (
      this.newIdx >= 0 &&
      this.currentIdx >= 0 &&
      this.newIdx !== this.currentIdx
    ) {
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
    }

    this.newIdx = -1;
    this.currentIdx = -1;
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
      pieces: [
        {order: numberPage, file: {uri: null, base64: null, node: null}},
      ],
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
          underlayColor={'rgba(0, 0, 0, 0.5)'}
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
        onRowHeight={this.handleOnRowSize}
      />
    );
  };

  render() {
    const {pages, dragging, draggingIdx} = this.state;

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
            <CartLayoutWrapper page={pages[draggingIdx]} />
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
    width: 91,
    height: 100,
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
