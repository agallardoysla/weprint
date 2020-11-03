import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import GeneralImage from '../../../generales/GeneralImage';
import {colores, tipoDeLetra} from '../../../constantes/Temas';

const FormatCardView = ({format, onPressGoToSelectImage}) => {
  const handleOnPress = () => onPressGoToSelectImage(format.id);

  return (
    <TouchableOpacity onPress={handleOnPress} style={style.formatContainer}>
      <View style={style.formatImgContainer}>
        <GeneralImage uri={format.image} styleImg={style.formatImg} />
      </View>
      <View style={style.formatInfoContainer}>
        <View style={style.formatTextContainer}>
          <View>
            <Text style={style.fomatInfoSmallText}>{format.quantity}</Text>
          </View>
          <View>
            <Text style={style.fomatInfoSmallText}>Desde</Text>
          </View>
        </View>
        <View style={style.formatTextContainerBigText}>
          <View>
            <Text style={style.formatInfoBigText}>
              Álbum {format.dimensions}
            </Text>
          </View>
          <View>
            <Text style={style.formatInfoBigText}>
              CLP$ {format.price_unit}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  formatContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 768,
    marginBottom: 25,
    paddingHorizontal: 12,
  },
  formatImgContainer: {
    width: '100%',
    height: 250,
  },
  formatImg: {
    width: '100%',
    height: '100%',
  },
  formatInfoContainer: {
    padding: 16,
    borderBottomWidth: 5,
    borderColor: colores.logo,
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
  },
  formatTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  formatTextContainerBigText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  fomatInfoSmallText: {
    color: colores.grisLetter,
    fontFamily: tipoDeLetra.regular,
    fontSize: 12,
  },
  formatInfoBigText: {
    color: colores.negroMedio,
    fontFamily: tipoDeLetra.regular,
    fontSize: 15,
  },
});

export default FormatCardView;
