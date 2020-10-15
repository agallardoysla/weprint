import React, {useEffect, useRef, useState, useCallback} from 'react';
import {PhotoEditorModal, Configuration} from 'react-native-photoeditorsdk';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import {actions} from '../../redux';
import {get_layout_api} from '../../utils/apis/layout_api';
import EditCartLayoutCover from '../components/EditCartLayoutCover';
import EditCartLayoutList from '../components/EditCartLayoutList';
import EditCartLayoutFooter from '../components/EditCartLayoutFooter';
import SelectionListImage from '../../generales/SelectionListImage';

function EditCartLayoutImage({dispatch, navigation, route, pages, layouts}) {
  const searchPage = (numberPage) =>
    pages.find((pageSearched) => pageSearched.number === numberPage);

  const [layoutLoading, setLayoutLoading] = useState(true);
  const [layoutError, setLayoutError] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [imagesAdded, setImagesAdded] = useState([]);
  const [showSelectImage, setShowSelectImage] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(1);
  const maxQuantity = useRef(1);
  const minQuantity = useRef(1);
  const [selectedPage, setSelectedPage] = useState(
    searchPage(route.params.numberPage),
  );

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

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectedLayout = (layoutId) => setSelectedLayout(layoutId);

  const handleShowListImage = (min = 1) => {
    console.warn('min', min);
    minQuantity.current = 1;
    //minQuantity.current = min;
    //maxQuantity.current = max;
    handleToggleListImage();
  };

  const handleToggleListImage = () => setShowSelectImage(!showSelectImage);
  const handleResponseImage = (images) => {
    handleToggleListImage();
    setImagesAdded(images);
  };

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
            image={`data:image/gif;base64,${selectedPage.pieces[0].file}`}
            onExport={(result) => {
              console.log('resul', result);
            }}
          />
          <TouchableOpacity style={style.editCartLayoutImageHeader}>
            <Icon name="arrow-left" size={27} color={colores.negro} />
            <Text style={style.editCartLayoutImageHeaderText}>
              Página {selectedPage.number}
            </Text>
          </TouchableOpacity>
          <EditCartLayoutCover
            onShowListImage={handleShowListImage}
            selectedLayout={selectedLayout}
            selectedPage={selectedPage}
            imagesAdded={imagesAdded}
          />
          <EditCartLayoutList
            error={layoutError}
            loading={layoutLoading}
            layouts={layouts}
            selectedLayout={selectedLayout}
            onSelectedLayout={handleSelectedLayout}
          />
          <EditCartLayoutFooter />
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
    pages: preSelectedCart.pages,
    layouts,
  };
};

export default connect(mapStateToProps)(EditCartLayoutImage);
