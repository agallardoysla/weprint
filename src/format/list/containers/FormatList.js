import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../../redux';
import {tipoDeLetra, colores} from '../../../constantes/Temas';
import {get_format_by_project} from '../../../utils/apis/project_api';
import Cargando from '../../../generales/Cargando';
import FormatCardView from '../components/FormatCardView';
import orderBy from 'lodash/orderBy';
import Icon from 'react-native-vector-icons/dist/Feather';

function FormatList({dispatch, navigation, route, formats}) {
  const {projectId} = route.params;
  const [formatError, setFormatError] = useState(false);
  const [loadingFormat, setLoadingFormat] = useState(true);

  const loadFormats = useCallback(async () => {
    setFormatError(false);
    setLoadingFormat(true);

    try {
      const response = await get_format_by_project(projectId);

      if (response.data.length) {
        dispatch(actions.actualizarFormats(response.data));
      }

      setLoadingFormat(false);
    } catch (error) {
      setLoadingFormat(false);
      setFormatError(true);
    }
  }, [projectId, dispatch]);

  const loadData = useCallback(() => {
    if (formats.length) {
      setLoadingFormat(false);
    } else {
      loadFormats();
    }
  }, [setLoadingFormat, loadFormats, formats.length]);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOnPressGoToBack = () => navigation.navigate('Home');

  const handleOnPressGoToSelectImage = (formatId) =>
    navigation.navigate('FormatDetail', {formatId});

  const isEmptyFormats = () =>
    !loadingFormat && !formatError && !formats.length;

  const renderFormatCards = ({item: format}) => (
    <FormatCardView
      format={format}
      onPressGoToSelectImage={handleOnPressGoToSelectImage}
    />
  );

  return (
    <View style={style.formatContainer}>
      <TouchableOpacity
        style={style.formatHeader}
        onPress={handleOnPressGoToBack}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
      </TouchableOpacity>
      {loadingFormat && <Cargando titulo="" loaderColor={colores.logo} />}
      {formatError && (
        <View style={style.formatGeneralMessageContainer}>
          <Text style={style.formatGeneralMessage}>
            En estos momentos no se pudieron cargar los datos :C
          </Text>
        </View>
      )}
      {isEmptyFormats() && (
        <View style={style.formatGeneralMessageContainer}>
          <Text style={style.formatGeneralMessage}>
            Este proyecto no posee formatos
          </Text>
        </View>
      )}
      {formats.length > 0 && !loadingFormat && (
        <FlatList
          data={formats}
          renderItem={renderFormatCards}
          keyExtractor={(format) => format.id.toString()}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  formatHeader: {
    height: 60,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  formatContainer: {
    height: '100%',
  },
  formatGeneralMessageContainer: {
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  formatGeneralMessage: {
    marginLeft: 20,
    color: 'black',
    fontFamily: tipoDeLetra.bold,
    fontSize: 18,
  },
});

const mapStateToProps = (
  state,
  {
    route: {
      params: {projectId},
    },
  },
) => {
  const data = state.format.data.filter(
    (format) => format.project_id === projectId,
  );

  return {
    formats: orderBy(data, ['created'], ['desc']),
  };
};

export default connect(mapStateToProps)(FormatList);
