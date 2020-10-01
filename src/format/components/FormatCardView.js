import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colores, tipoDeLetra} from '../../constantes/Temas';

const FormatCardView = ({format, onPressGoToSelectImage}) => {
  const handleOnPress = () => onPressGoToSelectImage(format.id);

  return (
    <TouchableOpacity onPress={handleOnPress} style={style.formatContainer}>
      <View style={style.formatImgContainer}>
        <Image
          style={style.formatImg}
          source={{
            uri: format.image,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={style.formatInfoContainer}>
        <Text style={style.formatInfoTitle}>{format.name}</Text>
        <Text style={style.fomatInfoSmallText}>{format.quantity}</Text>
        <Text style={style.formatInfoBigText}>Álbum {format.dimensions}</Text>
        <Text style={style.fomatInfoSmallText}>desde</Text>
        <Text style={style.formatInfoBigText}>CLP {format.price_unit}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  formatContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 768,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  formatImgContainer: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  formatImg: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: '100%',
  },
  formatInfoContainer: {
    margin: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  formatInfoTitle: {
    paddingLeft: 4,
    color: colores.grisFormatoAlbum,
    fontFamily: tipoDeLetra.regular,
    fontSize: 20,
  },
  fomatInfoSmallText: {
    marginVertical: 14,
    color: colores.grisFormatoAlbum,
    fontFamily: tipoDeLetra.regular,
    fontSize: 14,
  },
  formatInfoBigText: {
    marginTop: 14,
    marginBottom: 10,
    color: colores.grisFormatoAlbum,
    fontFamily: tipoDeLetra.regular,
    fontSize: 22,
  },
});

export default FormatCardView;
