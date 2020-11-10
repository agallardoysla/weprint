import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores, tipoDeLetra} from '../../../constantes/Temas';

const EditCartLayoutFooter = ({pages, page, onSelectPage, onSaveChanges}) => {
  const renderStrArrowLeft = () => {
    const {number} = page;
    const beforePage = number > 0 ? number - 1 : number;
    let pg = `Pg ${beforePage}`;

    if (number === beforePage) {
      pg = 'Fin';
    } else if (beforePage === 0) {
      pg = 'Portada';
    }

    return pg;
  };

  const renderStrArrowRight = () => {
    const {number} = page;
    const endPage = pages.length - 1;
    const afterPage = number + 1;

    return number === endPage ? 'Fin' : `Pg ${afterPage}`;
  };

  const handleOnPressArrowLeft = () => {
    if (renderStrArrowLeft() !== 'Fin') {
      const numberPage = page.number - 1;
      onSelectPage(numberPage);
    }
  };

  const handleOnPressArrowRight = () => {
    if (renderStrArrowRight() !== 'Fin') {
      const numberPage = page.number + 1;
      onSelectPage(numberPage);
    }
  };
  return (
    <View style={style.footerContainer}>
      <TouchableWithoutFeedback onPress={handleOnPressArrowLeft}>
        <View style={style.arrowContainer}>
          <Icon name="chevron-left" size={45} color={colores.blanco} />
          <Text style={style.arrowText}>{renderStrArrowLeft()}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        delayPressIn={0}
        style={style.button}
        onPress={onSaveChanges}>
        <Text style={style.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={handleOnPressArrowRight}>
        <View style={style.arrowContainer}>
          <Text style={style.arrowText}>{renderStrArrowRight()}</Text>
          <Icon name="chevron-right" size={45} color={colores.blanco} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const style = StyleSheet.create({
  footerContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  button: {
    width: '40%',
    paddingVertical: 10,
    paddingHorizontal: 2,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colores.logo,
  },
  buttonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 17,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 17,
  },
});

export default EditCartLayoutFooter;
