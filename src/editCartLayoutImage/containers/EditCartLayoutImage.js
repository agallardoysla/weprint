import React, {useEffect, useRef, useState, useCallback} from 'react';
import {PhotoEditorModal, PESDK} from 'react-native-photoeditorsdk';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import concat from 'lodash/concat';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {get_layout_api} from '../../utils/apis/layout_api';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import isNull from 'lodash/isNull';
import Icon from 'react-native-vector-icons/dist/Feather';
import RNFetchBlob from 'rn-fetch-blob';
import EditCartLayoutCover from '../components/EditCartLayoutCover';
import EditCartLayoutList from '../components/EditCartLayoutList';
import EditCartLayoutFooter from '../components/EditCartLayoutFooter';
import SelectionListImage from '../../generales/SelectionListImage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function EditCartLayoutImage({
  dispatch,
  navigation,
  route,
  preSelectedCart,
  layouts,
}) {
  const [layoutLoading, setLayoutLoading] = useState(true);
  const [layoutError, setLayoutError] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [photoEdit, setPhotoEdit] = useState('');
  const [selectedPages, setSelectedPages] = useState(
    concat(preSelectedCart.pages),
  );

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
  }, [setLayoutLoading, setLayoutError]);

  const loadData = useCallback(() => {
    if (layouts.length) {
      setLayoutLoading(false);
    } else {
      loadLayouts();
    }
  }, [loadLayouts, setLayoutLoading]);

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

  const handleResponseImage = (images) => {
    const prevImages = selectedPage.pieces.filter(
      (piece) => !isNull(piece.file),
    );
    const newImages = images.map((img) => ({file: img.base64}));
    const selectedImages = concat(prevImages, newImages);

    const pieces = selectedImages.map((piece, index) => ({
      ...piece,
      order: index,
    }));

    handleUpdatePage(pieces);
    handleToggleListImage();
  };

  const handleOnEditPhoto = (file) => {
    const selectedPhoto = selectedPage.pieces.find(
      (piece) => piece.file === file,
    );

    setPhotoEdit(selectedPhoto.file);
    setShowEdit(true);
  };

  const handleCancelEditPhoto = () => {
    setPhotoEdit('');
    setShowEdit(false);
  };

  const handleExport = async (result) => {
    const position = selectedPage.pieces.findIndex(
      (piece) => piece.file === photoEdit,
    );
    const base64 = await RNFetchBlob.fs.readFile(result.image, 'base64');
    const pieces = concat(selectedPage.pieces);
    pieces[position] = {...pieces[position], file: base64};

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
    dispatch(
      actions.agregarCartPreseleccionado(route.params.storageId, {
        ...preSelectedCart,
        pages: selectedPages,
      }),
    );

    navigation.goBack();
  };

  const handleOnPressDelete = () => handleUpdatePage([]);

  PESDK.unlockWithLicense(require('../../../pesdk_android_license.json'));

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      {showSelectImage ? (
        <SelectionListImage
          minQuantity={minQuantity.current}
          maxQuantity={maxQuantity.current}
          onPressGoToBack={handleToggleListImage}
          onResponse={handleResponseImage}
        />
      ) : (
        <View style={style.editCartLayoutMainContainer}>
          <PhotoEditorModal
            visible={showEdit}
            image={`data:image/gif;base64,${photoEdit}`}
            onCancel={handleCancelEditPhoto}
            onExport={handleExport}
          />
          <TouchableOpacity style={style.editCartLayoutImageHeader}>
            <Icon name="arrow-left" size={27} color={colores.negro} />
            <Text style={style.editCartLayoutImageHeaderText}>
              Página {selectedPage.number}
            </Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={handleOnPressDelete}>
            <Text>borrar diseño</Text>
          </TouchableWithoutFeedback>
          <EditCartLayoutCover
            onShowListImage={handleShowListImage}
            onEditPhoto={handleOnEditPhoto}
            selectedLayout={selectedLayout}
            selectedPage={selectedPage}
          />
          <EditCartLayoutList
            error={layoutError}
            loading={layoutLoading}
            layouts={layouts}
            selectedLayout={selectedLayout}
            onSelectedLayout={handleSelectedLayout}
          />
          <EditCartLayoutFooter
            onSelectPage={handleSelectPage}
            onSaveChanges={handleSaveChanges}
            pages={selectedPages}
            page={selectedPage}
          />
        </View>
      )}
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
    shadowColor: '#000',
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
    marginTop: 40,
    paddingRight: 6,
    alignItems: 'flex-end',
  },
  editCartImageDeleteText: {
    color: colores.rojo,
    fontSize: 18,
    fontFamily: tipoDeLetra.bold,
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
});

const mapStateToProps = (
  state,
  {
    route: {
      params: {storageId},
    },
  },
) => {
  const layouts = state.layout.data;
  const preSelectedCart = state.cart.shortlisted[storageId];

  return {
    preSelectedCart,
    layouts,
  };
};

export default connect(mapStateToProps)(EditCartLayoutImage);
