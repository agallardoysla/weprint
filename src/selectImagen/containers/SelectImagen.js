import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Cargando from '../../generales/Cargando';
import ImagenItem from '../components/ImagenItem';
import Icon from 'react-native-vector-icons/dist/Feather';

function SelectImagen({dispatch, navigation, route, format}) {
  const {albumTitle} = route.params;
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadImages = useCallback(async () => {
    const photos = await CameraRoll.getPhotos({
      assetType: 'Photos',
      first: 500,
      groupName: albumTitle,
      include: ['filename', 'location'],
    });

    setEdges(photos.edges);
    setLoading(false);
  }, [albumTitle, setEdges, setLoading]);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const renderImage = ({item: edge}) => (
    <ImagenItem uri={edge.node.image.uri} />
  );

  const handleOnPressGoToBack = () =>
    navigation.navigate('SelectAlbum', {
      formatId: format.id,
    });

  const handleOnPressGoToLayout = () =>
    navigation.navigate('Layout', {
      formatId: format.id,
    });

  return (
    <View style={style.selectImagenMainContainer}>
      <TouchableOpacity
        style={style.selectImagenHeader}
        onPress={handleOnPressGoToBack}>
        <Icon name="arrow-left" size={27} color="#000" />
        <View style={style.selectImagenHeaderTextContainer}>
          <Text style={style.selectImagenHeaderText}>Seleccionar</Text>
        </View>
      </TouchableOpacity>
      <View style={style.selectImagenListContainer}>
        {loading ? (
          <Cargando titulo="" />
        ) : (
          <FlatList
            data={edges}
            numColumns={3}
            renderItem={renderImage}
            keyExtractor={(edge) => edge.node.image.uri}
          />
        )}
      </View>
      <View style={style.selectImagenButtonContainer}>
        <TouchableOpacity
          style={style.selectImagenButton}
          onPress={handleOnPressGoToLayout}>
          <Text style={style.selectImagenButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  selectImagenMainContainer: {
    position: 'relative',
    height: '100%',
    paddingBottom: 100,
  },
  selectImagenHeader: {
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
  selectImagenHeaderText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 19,
  },
  selectImagenHeaderTextContainer: {
    marginLeft: 12,
    paddingBottom: 1,
  },
  selectImagenListContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  selectImagenButtonContainer: {
    position: 'absolute',
    bottom: 22,
    width: '100%',
    alignItems: 'center',
  },
  selectImagenButton: {
    width: 400,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 290486,
    borderWidth: 1,
    borderColor: colores.logo,
    backgroundColor: colores.logo,
  },
  selectImagenButtonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 20,
  },
});

const mapStateToProps = (
  state,
  {
    route: {
      params: {formatId},
    },
  },
) => {
  const format = state.format.data.find(
    (searchedFormat) => searchedFormat.id === formatId,
  );

  return {
    format,
  };
};

export default connect(mapStateToProps)(SelectImagen);
