import React, {useEffect, useRef, useState, useCallback} from 'react';
import {PhotoEditorModal, PESDK} from 'react-native-photoeditorsdk';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import concat from 'lodash/concat';
import {connect} from 'react-redux';
import {actions} from '../../../redux';
import {get_layout_api} from '../../../utils/apis/layout_api';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import isNull from 'lodash/isNull';
import Icon from 'react-native-vector-icons/dist/Feather';
import EditCartLayoutCover from '../components/EditCartLayoutCover';
import EditCartLayoutList from '../components/EditCartLayoutList';
import EditCartLayoutFooter from '../components/EditCartLayoutFooter';
import SelectionListImage from '../../../generales/SelectionListImage';
import Cargando from '../../../generales/Cargando';

function EditCartLayoutImage({dispatch, navigation, route, cart, layouts}) {
  const [layoutLoading, setLayoutLoading] = useState(true);
  const [layoutError, setLayoutError] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [photoEdit, setPhotoEdit] = useState(null);
  const [selectedPages, setSelectedPages] = useState(concat(cart.pages));

  const searchPage = (numberPage) =>
    selectedPages.find((pageSearched) => pageSearched.number === numberPage);

  const [selectedPage, setSelectedPage] = useState(
    searchPage(route.params.numberPage),
  );
  const [showSelectImage, setShowSelectImage] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(
    selectedPage.layout_id || 1,
  );
  const maxQuantity = useRef(1);
  const minQuantity = useRef(1);

  const loadLayouts = useCallback(async () => {
    setLayoutLoading(true);
    setLayoutError(false);

    try {
      const response = await get_layout_api();

      dispatch(actions.actualizarLayout(response.data.data));
      setLayoutLoading(false);
    } catch {
      setLayoutLoading(false);
      setLayoutError(true);
    }
  }, [setLayoutLoading, setLayoutError, dispatch]);

  const loadData = useCallback(() => {
    if (layouts.length) {
      setLayoutLoading(false);
    } else {
      loadLayouts();
    }
  }, [loadLayouts, setLayoutLoading, layouts]);

  const handleShowListImage = (min = 1, max = 1) => {
    minQuantity.current = min;
    maxQuantity.current = max;
    handleToggleListImage();
  };

  const handleToggleListImage = () => setShowSelectImage(!showSelectImage);

  const getPositionCurrentPage = () => {
    const positionPage = selectedPages.findIndex(
      (page) => page.number === selectedPage.number,
    );

    return positionPage;
  };

  const handleUpdatePage = (pieces) => {
    const positionPage = getPositionCurrentPage();

    const pages = concat(selectedPages);
    const page = {...selectedPage, layout_id: selectedLayout, pieces};

    pages[positionPage] = page;

    setSelectedPage(page);
    setSelectedPages(pages);
  };

  const handleSelectedLayout = (layoutId) => {
    const positionPage = getPositionCurrentPage();

    const pages = concat(selectedPages);
    const page = {...selectedPage, layout_id: layoutId};

    pages[positionPage] = page;

    setSelectedPage(page);
    setSelectedPages(pages);
    setSelectedLayout(layoutId);
  };

  const handleResponseImage = (newPieces) => {
    const prevPieces = selectedPage.pieces.filter(
      (piece) => !isNull(piece.file),
    );

    const fusedPieces = newPieces.map((piece) => ({file: piece.uri}));
    const selectedPieces = concat(prevPieces, fusedPieces);

    const pieces = selectedPieces.map((piece, index) => ({
      ...piece,
      order: index,
    }));

    handleUpdatePage(pieces);
    handleToggleListImage();
  };

  const handleOnEditPhoto = async (file) => {
    const selectedPhoto = selectedPage.pieces.find(
      (piece) => piece.file === file,
    );

    setPhotoEdit({source: selectedPhoto.file});
    setShowEdit(true);
  };

  const handleCancelEditPhoto = () => {
    setPhotoEdit(null);
    setShowEdit(false);
  };

  const handleExport = async (result) => {
    const position = selectedPage.pieces.findIndex(
      (piece) => piece.file === photoEdit.source,
    );

    const pieces = concat(selectedPage.pieces);
    pieces[position] = {...pieces[position], file: result.image};

    handleUpdatePage(pieces);
    setShowEdit(false);
    setPhotoEdit('');
  };

  const handleSelectPage = (numberPage) => {
    const page = searchPage(numberPage);
    setSelectedPage(page);
    setSelectedLayout(page.layout_id || 1);
  };

  const handleSaveChanges = () => {
    const pages = selectedPages.map((page) => {
      const pieces = getSelectedPieces(page.layout_id, page.pieces);
      return {
        ...page,
        pieces,
      };
    });

    dispatch(actions.editarCart({...cart, pages}, cart.id));
    dispatch(actions.cartHasLocalChange(true));

    navigation.goBack();
  };

  const handleGoBack = () => navigation.goBack();

  const getSelectedPieces = (layoutId, pieces) => {
    if (!layoutId || layoutId === 1) {
      return pieces.slice(0, 1);
    } else if (layoutId === 2) {
      return pieces.slice(0, 2);
    } else if (layoutId === 3 || layoutId === 5) {
      return pieces.slice(0, 4);
    } else if (layoutId === 4) {
      return pieces.slice(0, 3);
    }
  };

  const handleOnPressDelete = () => handleUpdatePage([]);

  PESDK.unlockWithLicense(require('../../../../pesdk_android_license.json'));

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setPhotoEdit(null);
    setShowEdit(false);
  }, []);

  return (
    <>
      {showSelectImage && (
        <SelectionListImage
          minQuantity={minQuantity.current}
          maxQuantity={maxQuantity.current}
          onPressGoToBack={handleToggleListImage}
          onResponse={handleResponseImage}
        />
      )}
      <View style={style.editCartLayoutMainContainer}>
        <ScrollView>
          <PhotoEditorModal
            visible={showEdit}
            image={photoEdit && photoEdit.source}
            onCancel={handleCancelEditPhoto}
            onExport={handleExport}
          />
          <TouchableOpacity
            style={style.editCartLayoutImageHeader}
            onPress={handleGoBack}>
            <Icon name="arrow-left" size={27} color={colores.negro} />
            <Text style={style.editCartLayoutImageHeaderText}>
              Página {selectedPage.number}
            </Text>
          </TouchableOpacity>
          {layoutLoading ? (
            <Cargando titulo="" loaderColor={colores.logo} />
          ) : (
            <>
              <TouchableOpacity
                style={style.editCartImageDeleteTextContainer}
                onPress={handleOnPressDelete}>
                <Text style={style.editCartImageDeleteText}>Borrar Diseño</Text>
              </TouchableOpacity>
              <EditCartLayoutCover
                onShowListImage={handleShowListImage}
                onEditPhoto={handleOnEditPhoto}
                selectedLayout={selectedLayout}
                selectedPage={selectedPage}
              />
              <EditCartLayoutList
                error={layoutError}
                layouts={layouts}
                selectedLayout={selectedLayout}
                onSelectedLayout={handleSelectedLayout}
              />
            </>
          )}
        </ScrollView>
        {!layoutLoading && (
          <EditCartLayoutFooter
            onSelectPage={handleSelectPage}
            onSaveChanges={handleSaveChanges}
            pages={selectedPages}
            page={selectedPage}
          />
        )}
      </View>
    </>
  );
}

const style = StyleSheet.create({
  editCartLayoutMainContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  editCartLayoutImageHeader: {
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
  editCartLayoutImageHeaderText: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: tipoDeLetra.regular,
  },
  editCartLayoutImageMainContainer: {
    position: 'relative',
  },
  editCartImageDeleteTextContainer: {
    marginTop: 32,
    marginBottom: 10,
    paddingRight: 16,
    alignItems: 'flex-end',
  },
  editCartImageDeleteText: {
    color: colores.rojo,
    fontSize: 15,
    fontFamily: tipoDeLetra.regular,
  },
  editCartContainerImage: {
    marginTop: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colores.grisFormatoAlbum,
    backgroundColor: colores.blanco,
  },
  editCartImageSize: {
    height: 240,
    width: 191,
  },
  editCartImageBox: {
    marginTop: 30,
    height: 120,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: colores.blanco,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    elevation: 999,
    zIndex: 999,
  },
});

const mapStateToProps = (
  state,
  {
    route: {
      params: {cartId},
    },
  },
) => {
  const layouts = state.layout.data;
  const cart = state.cart.data.find((searchCart) => searchCart.id === cartId);

  return {
    cart,
    layouts,
  };
};

export default connect(mapStateToProps)(EditCartLayoutImage);
