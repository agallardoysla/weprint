import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import {actions} from '../../redux';
import Cargando from '../../generales/Cargando';
import {get_layout_api} from '../../utils/apis/layout_api';

function EditCartLayoutImage({dispatch, navigation, page, layouts}) {
  const [layoutLoading, setLayoutLoading] = useState(true);
  const [layoutError, setLayoutError] = useState(false);

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

  const renderLayouts = ({item: layout}) => {
    return (
      <Image
        source={{uri: layout.preview}}
        style={style.editCartImageLayoutSize}
      />
    );
  };

  return (
    <View style={style.editCartLayoutMainContainer}>
      <TouchableOpacity style={style.editCartLayoutImageHeader}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
        <Text style={style.editCartLayoutImageHeaderText}>
          Página {page.number}
        </Text>
      </TouchableOpacity>
      <View style={style.editCartLayoutImageMainContainer}>
        <View style={style.editCartImageDeleteTextContainer}>
          <Text style={style.editCartImageDeleteText}>Borrar diseño</Text>
        </View>
        <View style={style.editCartContainerImage}>
          <Image
            source={{uri: `data:image/gif;base64,${page.pieces[0].file}`}}
            style={style.editCartImageSize}
          />
        </View>
      </View>

      {layoutError && (
        <View style={style.editCartImageBox}>
          <Text style={style.editCartImageErrorMessage}>
            No se pudieron cargar los layouts :C
          </Text>
        </View>
      )}
      {layoutLoading && (
        <View style={style.editCartImageLoadinContainer}>
          <Cargando titulo="" loaderColor={colores.logo} />
        </View>
      )}

      {layouts.length > 0 && (
        <>
          <View style={style.editCartImageLayoutPrompMainContainer}>
            <View style={style.editCartImageLayoutPrompContainer}>
              <Text style={style.editCartImageLayoutPrompText}>
                Selecciona layout
              </Text>
            </View>
          </View>
          <FlatList
            contentContainerStyle={style.editCartImageLayoutList}
            horizontal
            data={layouts}
            renderItem={renderLayouts}
            keyExtractor={(layout) => layout.id.toString()}
          />
        </>
      )}
    </View>
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
    marginTop: 45,
    paddingRight: 5,
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
  editCartImageErrorMessage: {
    marginLeft: 20,
    color: colores.negro,
    fontFamily: tipoDeLetra.bold,
    fontSize: 20,
  },
  editCartImageLoadinContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    justifyContent: 'center',
  },
  editCartImageLayoutSize: {
    marginHorizontal: 5,
    height: 110,
    width: 100,
  },
  editCartImageLayoutList: {
    position: 'absolute',
    bottom: 40,
  },
  editCartImageLayoutPrompMainContainer: {
    alignItems: 'center',
    width: '100%',
  },
  editCartImageLayoutPrompContainer: {
    marginTop: 30,
    width: 200,
    height: 40,
    backgroundColor: colores.blanco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editCartImageLayoutPrompText: {
    fontSize: 18,
    fontWeight: '700',
    color: colores.grisFormatoAlbum,
  },
});

const mapStateToProps = (
  state,
  {
    route: {
      params: {storageId, numberPage},
    },
  },
) => {
  const layouts = state.layout.data;
  const preSelectedCart = state.cart.shortlisted[storageId];
  const page = preSelectedCart.pages.find(
    (pageSearched) => pageSearched.number === numberPage,
  );

  return {
    page,
    layouts,
  };
};

export default connect(mapStateToProps)(EditCartLayoutImage);
