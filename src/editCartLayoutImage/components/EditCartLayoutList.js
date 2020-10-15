import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Cargando from '../../generales/Cargando';
import {colores, tipoDeLetra} from '../../constantes/Temas';

const EditCartLayoutList = ({
  loading,
  error,
  layouts,
  selectedLayout,
  onSelectedLayout,
}) => {
  const renderLayouts = ({item: layout}) => {
    const handleOnPress = () => onSelectedLayout(layout.id);

    return (
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View
          onPress={handleOnPress}
          style={{
            ...style.wrapperImage,
            borderColor:
              layout.id === selectedLayout ? colores.logo : 'transparent',
          }}>
          <Image source={{uri: layout.preview}} style={style.image} />
        </View>
      </TouchableWithoutFeedback>
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
    height: 100,
    width: Math.floor(Dimensions.get('window').width / 4 - 2),
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
    width: '100%',
    justifyContent: 'center',
  },
  prompMainContainer: {
    alignItems: 'center',
    width: '100%',
  },
  prompContainer: {
    marginTop: 30,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.blanco,
  },
  prompText: {
    color: colores.grisFormatoAlbum,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default EditCartLayoutList;
