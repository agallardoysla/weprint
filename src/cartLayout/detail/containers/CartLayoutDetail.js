import React, {useEffect, useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import concat from 'lodash/concat';
import omit from 'lodash/omit';
import has from 'lodash/has';
import flatten from 'lodash/flatten';
import Icon from 'react-native-vector-icons/dist/Feather';
import Cargando from '../../../generales/Cargando';
import SelectionListImage from '../../../generales/SelectionListImage';
import CartLayoutListImage from '../components/CartLayoutListImage';
import CartProgress from '../components/CartProgress';
import CartDeleteModal from '../components/CartDeleteModal';
import CartOptionsModal from '../components/CartOptionsModal';
import CartButton from '../components/CartButton';
import {actions} from '../../../redux';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import {
  create_cart,
  update_cart,
  get_pieces_by_cart,
} from '../../../utils/apis/cart_api';
import {get_format_by_id} from '../../../utils/apis/format_api';
import {upload_image_uri} from '../../../utils/apis/project_api';

const WEPRINT_REPO = 'weprint-app.s3.us-west-1.amazonaws.com';

function CartLayoutDetail({
  dispatch,
  navigation,
  route,
  cart,
  format,
  hasLocalChange,
}) {
  const getPiecesOneLevel = useCallback(() => {
    const pieces = cart.pages.map((page) => page.pieces);
    const piecesOneLevel = flatten(pieces);

    return piecesOneLevel;
  }, [cart]);

  const getPreSelectedImages = useCallback(() => {
    const piecesOneLevel = getPiecesOneLevel();
    const preSelectedFormat = piecesOneLevel.map((piece) => ({
      node: null,
      uri: piece.file,
    }));

    return preSelectedFormat;
  }, [getPiecesOneLevel]);

  const [showAddImages, setShowAddImages] = useState(false);
  const [showReorganize, setShowReorganize] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [preSelectedImages, setPreSelectedImages] = useState([]);

  const handleTransformCartFormat = useCallback((data) => {
    const pages = data.pages.map((page) => ({
      ...omit(page, ['active', 'cart_id', 'created', 'updated', 'id']),
      pieces: page.pieces.map((piece) => ({
        ...omit(piece, [
          'sort',
          'active',
          'cart_page_id',
          'created',
          'id',
          'updated',
        ]),
        order: piece.sort,
      })),
    }));

    return {...data, pages};
  }, []);

  const loadInitialData = useCallback(async () => {
    if (cart && !has(cart, 'pages')) {
      const response = await get_pieces_by_cart(cart.id);
      const editedCart = handleTransformCartFormat({
        ...cart,
        pages: response.data[0].pages,
      });

      dispatch(actions.editarCart(editedCart, editedCart.id));
    }

    if (!format && cart) {
      const response = await get_format_by_id(cart.format_id);
      dispatch(actions.agregarFormat(response.data[0]));
    }

    setLoading(false);
  }, [format, cart, handleTransformCartFormat, dispatch]);

  const calculateProgress = (totalPieces, numberOfPiecesSaved) => {
    const progressUpdated = Math.floor(
      (numberOfPiecesSaved / totalPieces) * 100,
    );

    setProgress(progressUpdated);
  };

  const wait = (n) => new Promise((res) => setTimeout(res, n));

  const uploadPieces = async (memo, piece) => {
    const pagePieces = await memo;
    const {file} = piece;
    const extension = file.substr(file.lastIndexOf('.') + 1);
    const filename = `${file.match(/.*\/(.+?)\./)[1]}.${extension}`;
    const type = `image/${extension}`;

    const body = {
      uri: file,
      filename,
      type,
    };

    try {
      if (!file.includes(WEPRINT_REPO)) {
        const response = await upload_image_uri(body);
        const data = JSON.parse(response);

        if (data && data.url) {
          const newPiece = {
            ...piece,
            file: data.url,
          };

          return [...pagePieces, newPiece];
        }
      }

      await wait(30);

      return [...pagePieces, piece];
    } catch (error) {
      return [...pagePieces, piece];
    }
  };

  const atLeastOneToUpload = () => {
    const piecesOneLevel = getPiecesOneLevel();

    return piecesOneLevel.some((piece) => !piece.file.includes(WEPRINT_REPO));
  };

  const handleSaveImages = async () => {
    setShowProgress(true);
    let numberOfPiecesSaved = 0;
    let pages = cart.pages;

    if (atLeastOneToUpload()) {
      const piecesOneLevel = getPiecesOneLevel();

      pages = await cart.pages.reduce(async (memo, page) => {
        const cartPages = await memo;
        const pieces = await page.pieces.reduce(uploadPieces, []);
        const newPage = {...page, pieces};
        numberOfPiecesSaved += pieces.length;

        calculateProgress(piecesOneLevel.length, numberOfPiecesSaved);

        return [...cartPages, newPage];
      }, []);
    }

    setShowProgress(false);
    setProgress(0);

    if (!cart.user_id) {
      handleAddCart(pages);
    } else {
      handleUpdateCart(pages);
    }
  };

  const handleAddCart = async (pages) => {
    setLoading(true);
    try {
      const response = await create_cart({...omit(cart, ['id']), pages});

      if (response.errors) {
        Alert.alert('No se pudo guardar, intenta de nuevo');
      } else if (response.success) {
        const editedCart = handleTransformCartFormat(response.data[0]);
        dispatch(actions.editarCart(editedCart, route.params.cartId));

        navigation.navigate('CartLayoutDetail', {
          cartId: editedCart.id,
          formatId: format.id,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('No se pudo guardar, intenta de nuevo');
    }
  };

  const handleUpdateCart = async (pages) => {
    setLoading(true);
    try {
      const response = await update_cart({...cart, pages}, cart.id);

      if (response.errors) {
        Alert.alert('No se pudo guardar, intenta de nuevo');
      } else if (response.success) {
        const editedCart = handleTransformCartFormat(response.data[0]);
        dispatch(actions.editarCart(editedCart, cart.id));
        dispatch(actions.cartHasLocalChange(false));
      }

      setLoading(false);
    } catch {
      setLoading(false);
      Alert.alert('No se pudo guardar, intenta de nuevo');
    }
  };

  const handleCalculatePrice = (totalPages) => {
    const minQuantity = format.min_quantity;
    const minPrice = format.min_price;
    const priceUnit = format.price_unit;

    if (totalPages > minQuantity) {
      return minPrice + (totalPages - minQuantity) * priceUnit;
    }

    return minPrice;
  };

  const handleLocalChangeCart = (pages) => {
    const editedCart = {
      ...cart,
      pages,
      price: handleCalculatePrice(pages.length),
    };

    if (editedCart.user_id) {
      dispatch(actions.cartHasLocalChange(true));
    }

    dispatch(actions.editarCart(editedCart, editedCart.id));
  };

  const handleGoToEditCartImage = (page) =>
    navigation.navigate('EditCartLayoutImage', {
      numberPage: page.number,
      cartId: cart.id,
    });

  const handleGoBack = useCallback(() => {
    dispatch(actions.cartHasLocalChange(false));

    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }, [navigation, dispatch]);

  const handleToggleShowImages = () => {
    if (!loading) {
      setShowAddImages(!showAddImages);
    }
  };

  const handleToggleReorganizeModal = () => {
    if (!loading) {
      setShowReorganize(!showReorganize);
    }
  };

  const handleToggleOptionsModal = () => {
    if (!loading) {
      setShowOptions(!showOptions);
    }
  };

  const handleResponseImages = (images) => {
    if (images.length > preSelectedImages.length) {
      const newImages = images.slice(preSelectedImages.length, images.length);
      const newPages = newImages.map((img) => ({
        number: 0,
        layout_id: 1,
        pieces: [
          {
            order: 0,
            file: img.uri,
          },
        ],
      }));

      const pages = concat(cart.pages, newPages).map((page, index) => ({
        ...page,
        number: index,
      }));

      dispatch(actions.editarCart({...cart, pages}, cart.id));
    }

    handleToggleShowImages();
    dispatch(actions.cartHasLocalChange(true));
  };

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  useEffect(() => {
    if (cart && has(cart, 'pages')) {
      const preSelectedFormat = getPreSelectedImages();
      setPreSelectedImages(preSelectedFormat);
    }
  }, [cart, getPreSelectedImages]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleGoBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [handleGoBack]),
  );

  return (
    <>
      <CartOptionsModal
        showReorganize={showReorganize}
        onToggleReorganizeModal={handleToggleReorganizeModal}
      />
      <CartDeleteModal
        showOptions={showOptions}
        onToggleOptionsModal={handleToggleOptionsModal}
      />
      <CartProgress progress={progress} showProgress={showProgress} />

      <View style={style.cartLayoutMainContainer}>
        <>
          {showAddImages && (
            <View style={style.cartLayoutImageSelected}>
              <SelectionListImage
                minQuantity={format.min_quantity}
                preSelectedImages={preSelectedImages}
                onResponse={handleResponseImages}
                onPressGoToBack={handleToggleShowImages}
              />
            </View>
          )}
          <TouchableOpacity
            style={style.cartLayoutHeader}
            onPress={handleGoBack}>
            <Icon name="arrow-left" size={27} color={colores.negro} />
            <Text style={style.cartLayoutHeaderText}>Plantilla</Text>
          </TouchableOpacity>
          <View style={style.cartLayoutIconsBar}>
            <TouchableOpacity
              style={style.cartLayoutIconContainerFirst}
              onPress={handleToggleShowImages}>
              <Icon name="image" size={20} color={colores.negro} />
              <Text style={style.cartLayoutIconText}>Añadir fotos </Text>
            </TouchableOpacity>
            {/*<TouchableOpacity
              style={style.cartLayoutIconContainer}
              onPress={handleToggleReorganizeModal}>
              <Icon name="layout" size={20} color={colores.negro} />
              <Text style={style.cartLayoutIconText}>Reorganizar</Text>
            </TouchableOpacity>*/}
            {/*<TouchableOpacity
              style={style.cartLayoutIconContainer}
              onPress={handleToggleOptionsModal}>
              <Icon name="sliders" size={20} color={colores.negro} />
              <Text style={style.cartLayoutIconText}>Opciones</Text>
            </TouchableOpacity>*/}
          </View>
          {loading ? (
            <Cargando titulo="" loaderColor={colores.logo} />
          ) : (
            <>
              <CartLayoutListImage
                onSavePages={handleLocalChangeCart}
                onGoToEditCartImage={handleGoToEditCartImage}
                cart={cart}
                format={format}
              />
            </>
          )}
        </>
        {!showAddImages && (
          <View style={style.footer}>
            <CartButton
              cart={cart}
              hasLocalChange={hasLocalChange}
              loading={loading}
              onHandleSaveImages={handleSaveImages}
            />
          </View>
        )}
      </View>
    </>
  );
}

const mapStateToProps = (
  state,
  {
    route: {
      params: {formatId, cartId},
    },
  },
) => {
  const format = state.format.data.find(
    (searchedFormat) => searchedFormat.id === formatId,
  );

  const cart = state.cart.data.find((searchCart) => searchCart.id === cartId);
  const {hasLocalChange} = state.cart;

  return {
    format,
    cart,
    hasLocalChange,
  };
};

const style = StyleSheet.create({
  cartLayoutMainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  cartLayoutImageSelected: {
    elevation: 100,
  },
  cartLayoutHeader: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cartLayoutHeaderText: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: tipoDeLetra.regular,
  },
  cartLayoutIconsBar: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: colores.grisClaro,
  },
  cartLayoutIconContainer: {
    height: '100%',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderRightColor: colores.grisClaro,
  },
  cartLayoutIconContainerFirst: {
    height: '100%',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colores.grisClaro,
    paddingVertical: 2,
  },
  cartLayoutIconText: {
    maxWidth: 95,
    paddingLeft: 5,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  button: {
    width: '40%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colores.logo,
    elevation: 5,
    zIndex: 5,
  },
  buttonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 16,
  },
});

export default connect(mapStateToProps)(CartLayoutDetail);
