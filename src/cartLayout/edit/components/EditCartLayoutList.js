import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Cargando from '../../../generales/Cargando';
import {colores, tipoDeLetra} from '../../../constantes/Temas';

const EditCartLayoutItem = ({layout, selectedLayout, onSelectedLayout}) => {
  const handleOnPress = () => onSelectedLayout(layout.id);

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View
        onPress={handleOnPress}
        style={{
          ...style.wrapperImage,
          width: Math.floor(useWindowDimensions().width / 4 - 2),
          height: Math.floor(useWindowDimensions().width / 4 - 2 - 9),
          borderColor:
            layout.id === selectedLayout ? colores.logo : 'transparent',
        }}>
        <Image source={{uri: layout.preview}} style={style.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const EditCartLayoutList = ({
  loading,
  error,
  layouts,
  selectedLayout,
  onSelectedLayout,
}) => {
  const renderLayouts = ({item: layout}) => {
    return (
      <EditCartLayoutItem
        layout={layout}
        selectedLayout={selectedLayout}
        onSelectedLayout={onSelectedLayout}
      />
    );
  };

  return (
    <>
      {error && (
        <View style={style.errorContainer}>
          <Text style={style.errorMessage}>
            No se pudieron cargar los layouts :C
          </Text>
        </View>
      )}
      {loading && (
        <View style={style.loadingContainer}>
          <Cargando titulo="" loaderColor={colores.logo} />
        </View>
      )}
      {layouts.length > 0 && (
        <>
          <View style={style.prompMainContainer}>
            <View style={style.prompContainer}>
              <Text style={style.prompText}>Selecciona layout</Text>
            </View>
          </View>
          <FlatList
            horizontal
            contentContainerStyle={style.listContent}
            data={layouts}
            renderItem={renderLayouts}
            keyExtractor={(layout) => layout.id.toString()}
          />
        </>
      )}
    </>
  );
};

const style = StyleSheet.create({
  wrapperImage: {
    marginHorizontal: 2,
    borderWidth: 2,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  errorContainer: {
    marginTop: 30,
    height: 120,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: colores.blanco,
  },
  errorMessage: {
    marginLeft: 20,
    color: colores.negro,
    fontFamily: tipoDeLetra.bold,
    fontSize: 20,
  },
  loadingContainer: {
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompMainContainer: {
    alignItems: 'center',
    width: '100%',
  },
  prompContainer: {
    marginTop: 13,
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colores.blanco,
  },
  prompText: {
    color: colores.grisFormatoAlbum,
    fontSize: 15,
    fontWeight: '700',
  },
  listContent: {
    marginTop: 12,
    paddingBottom: 60,
  },
});

export default EditCartLayoutList;
