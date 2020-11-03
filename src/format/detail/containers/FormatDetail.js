import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../../redux';
import Icon from 'react-native-vector-icons/dist/Feather';
import GeneralImage from '../../../generales/GeneralImage';
import {tipoDeLetra, colores} from '../../../constantes/Temas';

function FormatDetail({dispatch, navigation, format}) {
  const handleOnPressGoToBack = () => navigation.goBack();
  const handleOnPressGoToCreateProject = () =>
    navigation.navigate('CartLayoutCreate', {
      formatId: format.id,
    });

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  return (
    <View style={style.formatContainer}>
      <ScrollView>
        <View style={style.formatImageContainer}>
          <GeneralImage uri={format.image} styleImg={style.formatImage} />
        </View>
        <View style={style.formatContent}>
          <Text style={style.formatTitle}>{format.name}</Text>
          <View style={style.formatSecondTitleContainer}>
            <Text style={style.formatSecondTitleText}>A partir de</Text>
            <Text style={style.formatPrice}>${format.min_price}</Text>
            <View style={style.formatIconContainer}>
              <Icon name="alert-circle" size={18} color={colores.lila} />
            </View>
          </View>
          <View style={style.formatDescriptionContainer}>
            <Text style={style.formatDescription}>{format.description}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={style.arrowContainer}
        onPress={handleOnPressGoToBack}>
        <Icon name="arrow-left" size={35} color={colores.blanco} />
      </TouchableOpacity>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.button}
          onPress={handleOnPressGoToCreateProject}>
          <Text style={style.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  formatContainer: {
    position: 'relative',
    height: '100%',
    backgroundColor: colores.blanco,
  },
  formatImageContainer: {
    maxHeight: 310,
  },
  formatImage: {
    height: '100%',
    width: '100%',
  },
  formatContent: {
    padding: 16,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
  },
  formatTitle: {
    marginTop: 5,
    color: colores.negro,
    fontWeight: 'bold',
    fontSize: 22,
  },
  formatSecondTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  formatSecondTitleText: {
    color: colores.grisLetter,
    fontWeight: '300',
    fontFamily: tipoDeLetra.regular,
    fontSize: 18,
  },
  formatPrice: {
    marginLeft: 6,
    color: colores.negro,
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
    fontSize: 18,
  },
  formatIconContainer: {
    paddingTop: 2,
    marginLeft: 8,
  },
  formatDescriptionContainer: {
    marginTop: 16,
    marginBottom: 50,
  },
  formatDescription: {
    color: colores.negroMedio,
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 25,
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    left: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    width: '80%',
    marginHorizontal: '20%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 290486,
    backgroundColor: colores.logo,
  },
  buttonText: {
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

export default connect(mapStateToProps)(FormatDetail);
