import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores, tipoDeLetra} from '../../constantes/Temas';

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
      <TouchableOpacity style={style.button} onPress={onSaveChanges}>
        <Text
          style={{
            ...style.arrowText,
            fontSize: 17,
            fontWeight: '600',
          }}>
          Guardar cambios
        </Text>
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
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colores.negro,
  },

  button: {
    paddingVertical: 5,
    paddingHorizontal: 3,
    width: 140,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: colores.logo,
    transform: [{scale: 1}],
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 18,
  },
});

export default EditCartLayoutFooter;
