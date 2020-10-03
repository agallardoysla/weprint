import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Cargando from '../../generales/Cargando';

function SelectImagen({dispatch, navigation, format}) {
  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  return <Text>select imagen</Text>;
}
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
