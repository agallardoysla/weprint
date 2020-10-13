import React, {useEffect, useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import {actions} from '../../redux';
import Cargando from '../../generales/Cargando';
import CartLayoutListImage from '../components/CartLayoutListImage';

function CartLayout({
  dispatch,
  navigation,
  route,
  preSelectedImages,
  preSelectedCart,
  format,
}) {
  const {storageId} = route.params;
  const [loading, setLoading] = useState(true);

  const getPages = useCallback(() => {
    const pages = preSelectedImages.map((img, index) => ({
      number: index,
      layout_id: null,
      pieces: [
        {
          order: 0,
          file: img.base64,
        },
      ],
    }));

    return pages;
  }, []);

  const handleSavePreSelectedCart = useCallback((pages) => {
    const basePreSelectedCart = {
      format_id: format.id,
      name: preSelectedCart ? preSelectedCart.name : '',
      description: preSelectedCart ? preSelectedCart.description : '',
      pages,
    };

    dispatch(
      actions.agregarCartPreseleccionado(storageId, basePreSelectedCart),
    );

    navigation.navigate('CartLayout', {
      formatId: format.id,
      storageId,
    });

    setLoading(false);
  }, []);

  const handlePreSelectedCart = useCallback(() => {
    if (!preSelectedCart) {
      const pages = getPages();
      handleSavePreSelectedCart(pages);
    } else {
      setLoading(false);
    }
  }, [getPages, handleSavePreSelectedCart, setLoading]);

  const handleGoToEditCartImage = (page) =>
    navigation.navigate('EditCartLayoutImage', {
      numberPage: page.number,
      storageId,
    });

  const handleGoBack = useCallback(
    () => navigation.navigate('SelectImagen', {storageId}),
    [navigation],
  );

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  useEffect(() => handlePreSelectedCart(), [handlePreSelectedCart]);

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
    <View style={style.cartLayoutMainContainer}>
      <TouchableOpacity style={style.cartLayoutHeader} onPress={handleGoBack}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
        <Text style={style.cartLayoutHeaderText}>Plantilla</Text>
      </TouchableOpacity>
      <View style={style.cartLayoutIconsBar}>
        <View
          style={{
            ...style.cartLayoutIconContainer,
            borderRightWidth: 1,
            borderRightColor: colores.grisClaro,
          }}>
          <Icon name="image" size={20} color={colores.negro} />
          <Text style={style.cartLayoutIconText}>Añadir fotos</Text>
        </View>
        <View style={style.cartLayoutIconContainer}>
          <Icon name="layout" size={20} color={colores.negro} />
          <Text style={style.cartLayoutIconText}>Reorganizar</Text>
        </View>
        <View style={style.cartLayoutIconContainer}>
          <Icon name="sliders" size={20} color={colores.negro} />
          <Text style={style.cartLayoutIconText}>Opciones</Text>
        </View>
      </View>
      {loading ? (
        <Cargando titulo="" loaderColor={colores.logo} />
      ) : (
        <CartLayoutListImage
          onSavePages={handleSavePreSelectedCart}
          onGoToEditCartImage={handleGoToEditCartImage}
          preSelectedCart={preSelectedCart}
          format={format}
        />
      )}
    </View>
  );
}

const mapStateToProps = (
  state,
  {
    route: {
      params: {formatId, storageId},
    },
  },
) => {
  const format = state.format.data.find(
    (searchedFormat) => searchedFormat.id === formatId,
  );

  const preSelectedImages = state.selectImage.preSelectedImages[storageId];
  const preSelectedCart = state.cart.shortlisted[storageId];

  return {
    format,
    preSelectedImages,
    preSelectedCart,
  };
};

const style = StyleSheet.create({
  cartLayoutMainContainer: {
    width: '100%',
    height: '100%',
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
    paddingLeft: 15,
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    borderRightWidth: 0.5,

    borderRightColor: colores.grisClaro,
  },
  cartLayoutIconText: {
    maxWidth: 95,
    paddingLeft: 5,
    fontSize: 16,
  },
});

export default connect(mapStateToProps)(CartLayout);
