import React from 'react';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import GeneralImage from '../../../generales/GeneralImage';
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
          height: Math.floor(useWindowDimensions().width / 4 - 2),
          borderColor:
            layout.id === selectedLayout ? colores.logo : 'transparent',
        }}>
        <GeneralImage uri={layout.preview} styleImg={style.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const EditCartLayoutList = ({
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

  const renderList = () => !error && layouts.length > 0;

  return (
    <>
      {error && (
        <View style={style.errorContainer}>
          <Text style={style.errorMessage}>
            No se pudieron cargar los layouts :C
          </Text>
        </View>
      )}
      {renderList() && (
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
    borderWidth: 1,
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
    marginTop: 20,
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.blanco,
  },
  prompText: {
    color: colores.grisFormatoAlbum,
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    marginTop: 15,
  },
});

export default EditCartLayoutList;
