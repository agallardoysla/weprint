import React, {useEffect, useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import {actions} from '../../redux';
import Cargando from '../../generales/Cargando';
import SelectionListImage from '../../generales/SelectionListImage';
import CartLayoutListImage from '../components/CartLayoutListImage';
import concat from 'lodash/concat';

function CartLayout({
  dispatch,
  navigation,
  route,
  preSelectedImages,
  preSelectedCart,
  format,
}) {
  const {storageId} = route.params;
  const [showAddImages, setShowAddImages] = useState(false);
  const [showReorganize, setShowReorganize] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPages = useCallback(() => {
    const pages = preSelectedImages.map((img, index) => ({
      number: index,
      layout_id: null,
      pieces: [
        {
          order: 0,
          file: {...img},
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
    setLoading(false);
  }, []);

  const handlePreSelectedCart = useCallback(() => {
    const pages = getPages();
    handleSavePreSelectedCart(pages);
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
        layout_id: null,
        pieces: [
          {
            order: 0,
            file: {...img},
          },
        ],
      }));

      const pages = concat(
        preSelectedCart.pages,
        newPages,
      ).map((page, index) => ({...page, number: index}));

      dispatch(actions.actualizarImagenes(storageId, images));
      dispatch(
        actions.agregarCartPreseleccionado(storageId, {
          ...preSelectedCart,
          pages,
        }),
      );
    }

    handleToggleShowImages();
  };

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
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={showReorganize}
        onRequestClose={handleToggleReorganizeModal}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <TouchableOpacity style={style.modelOptionItemContainer}>
              <Text style={style.modelOptionItemText}>
                De más antiguas a más recientes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.modelOptionItemContainer}>
              <Text style={style.modelOptionItemText}>
                De más recientes a más antiguas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.modelOptionItemContainerEnd}
              onPress={handleToggleReorganizeModal}>
              <Text style={{...style.modelOptionItemText, color: colores.rojo}}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={showOptions}
        onRequestClose={handleToggleOptionsModal}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <TouchableOpacity style={style.modelOptionItemContainer}>
              <Text
                style={{
                  ...style.modelOptionItemText,
                  color: colores.azulNoche,
                }}>
                Eliminar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.modelOptionItemContainer}
              onPress={handleToggleOptionsModal}>
              <Text style={{...style.modelOptionItemText, color: colores.rojo}}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
              style={{
                ...style.cartLayoutIconContainer,
                borderRightWidth: 1,
                borderRightColor: colores.grisClaro,
                paddingVertical: 2,
              }}
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
              onSavePages={handleSavePreSelectedCart}
              onGoToEditCartImage={handleGoToEditCartImage}
              preSelectedCart={preSelectedCart}
              format={format}
            />
          )}
        </>
      </View>
    </>
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
  cartLayoutIconText: {
    maxWidth: 95,
    paddingLeft: 5,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    marginHorizontal: '20%',
    borderRadius: 20,
    backgroundColor: colores.blanco,
    elevation: 1,
  },
  modelOptionItemContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  modelOptionItemContainerEnd: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelOptionItemText: {
    fontFamily: tipoDeLetra.regular,
    fontWeight: '500',
    fontSize: 15,
  },
});

export default connect(mapStateToProps)(CartLayout);
