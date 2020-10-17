import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Animated,
  Image,
  View,
  TouchableOpacity,
  PanResponder,
  Dimensions,
} from 'react-native';
import concat from 'lodash/concat';
import isNull from 'lodash/isNull';
import CartLayoutCover from './CartLayoutCover';
import CartLayoutImage from './CartLayoutImage';
import Icon from 'react-native-vector-icons/dist/Feather';
import orderBy from 'lodash/orderBy';
import {colores} from '../../constantes/Temas';

const CartLayoutListImage = ({
  preSelectedCart,
  onGoToEditCartImage,
  onSavePages,
}) => {
  const [showDrag, setShowDrag] = useState(false);
  const [draggingIdx, setDragginIndex] = useState(-1);
  const [pages, setPages] = useState(
    orderBy(preSelectedCart.pages, ['number', 'asc']),
  );

  const pan = useRef(new Animated.ValueXY()).current;
  const currentY = useRef(0);
  const currentX = useRef(0);
  const scrollOffset = useRef(0);
  const flatlistTopOffset = useRef(0);
  const flatlistHeight = useRef(0);
  const flatlistRef = useRef();
  const rowHeight = useRef(0);
  const rowWidth = useRef(0);
  const headerHeight = useRef(0);
  const currentIdx = useRef(null);
  const newIdx = useRef(null);
  const active = useRef(false);
  const timeoutId = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        const row = getRow(gestureState.y0);
        const column = getColumn(gestureState.x0);
        const xStart =
          gestureState.x0 < rowWidth.current ? 10 : rowWidth.current + 10;

        currentY.current = gestureState.y0;
        currentX.current = gestureState.x0;
        currentIdx.current = getIndex(row, column);

        Animated.event([{y: pan.y, x: pan.x}], {useNativeDriver: false})(
          {
            y: gestureState.y0 - rowHeight.current / 2,
            x: xStart,
          },
          {},
        );

        active.current = true;
        setDragginIndex(currentIdx.current);

        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
          setShowDrag(true);
        }, 900);
      },
      onPanResponderMove: (evt, gestureState) => {
        currentY.current = gestureState.moveY;
        currentX.current = gestureState.moveX;
        Animated.event([{y: pan.y, x: pan.x}], {useNativeDriver: false})(
          {
            y: gestureState.moveY - rowHeight.current / 2,
            x: gestureState.moveX,
          },
          {},
        );

        if (currentY.current < 70) {
          reset();
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        reset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        reset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;

  const reset = () => {
    active.current = false;
    setShowDrag(false);
    setDragginIndex(-1);
    clearTimeout(timeoutId.current);
  };

  const getRow = useCallback((y) => {
    const row = Math.floor(
      (scrollOffset.current + y - flatlistTopOffset.current) /
        rowHeight.current,
    );

    return row;
  }, []);

  const getColumn = useCallback((x) => (x < rowWidth.current ? 0 : 1), []);

  const getIndex = useCallback((row, column) => {
    const firstColumnIndex = row * 2;
    const secondColumnIndex = firstColumnIndex + 1;

    return column === 0 ? firstColumnIndex : secondColumnIndex;
  }, []);

  const handleOnRowSize = (e) => {
    rowWidth.current = e.nativeEvent.layout.width;
    rowHeight.current = e.nativeEvent.layout.height;
  };

  const handleOnHeaderHeight = (e) => {
    headerHeight.current = e.nativeEvent.layout.height;
  };

  const handleChangeIndex = useCallback(() => {
    if (!active.current) return;

    requestAnimationFrame(() => {
      if (currentY.current + 80 > Dimensions.get('window').height) {
        flatlistRef.current.scrollToOffset({
          offset: scrollOffset.current + 20,
          animated: false,
        });
      } else if (currentY.current < 190) {
        flatlistRef.current.scrollToOffset({
          offset: scrollOffset.current - 20,
          animated: false,
        });
      }
      const row = getRow(currentY.current);
      const column = getColumn(currentX.current);
      const movedIndex = getIndex(row, column);
      if (movedIndex >= 0 && movedIndex <= pages.length) {
        newIdx.current = movedIndex;
      } else {
        newIdx.current = currentIdx.current;
      }

      handleChangeIndex();
    });
  }, []);

  const handleChangePages = useCallback(() => {
    if (isNull(currentIdx.current) || isNull(newIdx.current)) return;

    if (currentIdx.current != newIdx.current) {
      const pageFrom = pages[currentIdx.current];
      const pageTo = pages[newIdx.current];

      const newPages = pages.map((page) => ({
        ...page,
      }));

      newPages[currentIdx.current] = {...pageFrom, pieces: pageTo.pieces};
      newPages[newIdx.current] = {...pageTo, pieces: pageFrom.pieces};

      setPages(newPages);
      onSavePages(newPages);
    }

    currentIdx.current = null;
    newIdx.current = null;
  }, [pages, setPages]);

  const handleLayoutFlatlist = (e) => {
    flatlistHeight.current = e.nativeEvent.layout.height;
    flatlistTopOffset.current = e.nativeEvent.layout.y + headerHeight.current;
  };

  const handleOnScroll = async (e) => {
    scrollOffset.current = e.nativeEvent.contentOffset.y;

    clearTimeout(timeoutId.current);
  };

  const handleAddPage = (numberPage) => {
    const defaultPage = {
      layout_id: null,
      number: numberPage,
      pieces: [{order: numberPage, file: null}],
    };

    const selectedPages = concat(pages);
    selectedPages.splice(numberPage, 0, defaultPage);

    handleEditPages(selectedPages);
  };

  const handleDeletePage = (numberPage) => {
    const selectedPages = pages.filter((page) => page.number !== numberPage);
    handleEditPages(selectedPages);
  };

  const handleEditPages = (selectedPages) => {
    const newPages = selectedPages.map((selectedPage, index) => ({
      ...selectedPage,
      number: index,
    }));

    setPages(newPages);
  };

  const renderPages = ({item: page}) => (
    <CartLayoutImage
      page={page}
      panResponder={panResponder}
      onGoToEditCartImage={onGoToEditCartImage}
      onDeletePage={handleDeletePage}
      onRowHeight={handleOnRowSize}
    />
  );

  const renderSeparator = ({leadingItem}) => {
    const handleOnPress = () => {
      handleAddPage(leadingItem[1].number);
    };

    return (
      <View style={{marginLeft: 4}}>
        <TouchableOpacity
          style={style.cartLayoutIconContainer}
          onPress={handleOnPress}>
          <Icon name="plus" size={15} color={colores.verde} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (showDrag) {
      handleChangeIndex();
    } else {
      handleChangePages();
    }
  }, [handleChangeIndex, handleChangePages, showDrag]);

  useEffect(() => {
    setPages(orderBy(preSelectedCart.pages, ['number', 'asc']));
  }, [preSelectedCart, setPages]);

  return (
    <>
      {showDrag && (
        <Animated.View
          style={{
            ...style.cartLayoutImageAnimatedContainer,

            transform: [
              {translateX: pan.getLayout().left},
              {translateY: pan.getLayout().top},
            ],
          }}>
          <Image
            source={{
              uri: `data:image/gif;base64,${pages[draggingIdx].pieces[0].file}`,
            }}
            style={style.cartLayoutImageSize}
            resizeMode="cover"
          />
        </Animated.View>
      )}
      <FlatList
        scrollEnabled={!showDrag}
        contentContainerStyle={style.listContainer}
        ListHeaderComponent={
          <CartLayoutCover
            uri={pages[0].pieces[0].file}
            onHeaderHeight={handleOnHeaderHeight}
          />
        }
        ItemSeparatorComponent={renderSeparator}
        onScroll={handleOnScroll}
        onLayout={handleLayoutFlatlist}
        scrollEventThrottle={20}
        data={pages}
        numColumns={2}
        renderItem={renderPages}
        keyExtractor={(page) => page.number.toString()}
        ref={flatlistRef}
      />
    </>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: '50%',
    backgroundColor: colores.blanco,
    opacity: 0.7,
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 1,
  },
  cartLayoutIconContainer: {
    position: 'absolute',
    bottom: 35,
    width: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 1,
  },
});

export default CartLayoutListImage;
