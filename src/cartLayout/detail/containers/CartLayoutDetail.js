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
import flatten from 'lodash/flatten';
import Icon from 'react-native-vector-icons/dist/Feather';
import Cargando from '../../../generales/Cargando';
import SelectionListImage from '../../../generales/SelectionListImage';
import CartLayoutListImage from '../components/CartLayoutListImage';
import CartDeleteModal from '../components/CartDeleteModal';
import CartOptionsModal from '../components/CartOptionsModal';
import {actions} from '../../../redux';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import {create_cart} from '../../../utils/apis/cart_api';

function CartLayoutDetail({dispatch, navigation, route, cart, format}) {
  const getPreSelectedImages = useCallback((pages) => {
    const allPieces = pages.map((page) => page.pieces);
    const piecesLevel = flatten(allPieces);
    const preSelectedFormat = piecesLevel.map((piece) => ({
      node: null,
      uri: piece.file,
    }));

    return preSelectedFormat;
  }, []);

  const {cartId} = route.params;
  const [showAddImages, setShowAddImages] = useState(false);
  const [showReorganize, setShowReorganize] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preSelectedImages, setPreSelectedImages] = useState(
    getPreSelectedImages(cart.pages),
  );

  const handleAddCart = async () => {
    try {
      const response = await create_cart(omit(cart, ['id']));

      if (response.error) {
        Alert.alert('No se pudo guardar, intenta de nuevo');
      }
    } catch (error) {
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

  const handleSaveCart = (pages) => {
    const cartEdited = {
      ...cart,
      pages,
      price: handleCalculatePrice(pages.length),
    };

    dispatch(actions.agregarCart(cartEdited));
    setLoading(false);
  };

  const handleGoToEditCartImage = (page) =>
    navigation.navigate('EditCartLayoutImage', {
      numberPage: page.number,
      cartId,
    });

  const handleGoBack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }, [navigation]);

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

      dispatch(
        actions.agregarCart({
          ...cart,
          pages,
        }),
      );
    }

    handleToggleShowImages();
  };

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  useEffect(() => {
    const preSelectedFormat = getPreSelectedImages(cart.pages);
    setPreSelectedImages(preSelectedFormat);
  }, [cart, getPreSelectedImages]);

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
            <TouchableOpacity
              style={style.cartLayoutIconContainer}
              onPress={handleToggleReorganizeModal}>
              <Icon name="layout" size={20} color={colores.negro} />
              <Text style={style.cartLayoutIconText}>Reorganizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.cartLayoutIconContainer}
              onPress={handleToggleOptionsModal}>
              <Icon name="sliders" size={20} color={colores.negro} />
              <Text style={style.cartLayoutIconText}>Opciones</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <Cargando titulo="" loaderColor={colores.logo} />
          ) : (
            <CartLayoutListImage
              onSavePages={handleSaveCart}
              onGoToEditCartImage={handleGoToEditCartImage}
              cart={cart}
              format={format}
            />
          )}
        </>
        <View style={style.footer}>
          <TouchableOpacity style={style.button}>
            <Text style={style.buttonText}>Guardar Borrador</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
console.log('cart layout');
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

  const cart = state.cart.list[cartId];

  return {
    format,
    cart,
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
    shadowColor: '#000',
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
  },
  buttonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 16,
  },
});

export default connect(mapStateToProps)(CartLayoutDetail);
