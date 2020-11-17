import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colores, estiloDeLetra} from '../../constantes/Temas';

const ProductCartAddItem = ({onGoToFormatList}) => {
  const {width} = useWindowDimensions();

  const getResponsiveStyles = (widthScreen) => {
    return StyleSheet.create({
      mainContainer: {
        alignItems: widthScreen >= 450 ? 'stretch' : 'center',
        justifyContent: widthScreen >= 450 ? 'space-between' : 'space-around',
        flexDirection: widthScreen >= 450 ? 'row' : 'column',
        paddingHorizontal: 32,
        paddingBottom: 60,
        backgroundColor: colores.blanco,
      },
      imageContainer: {
        marginTop: 12,
        height: widthScreen >= 450 ? '75%' : '60%',
        width: widthScreen >= 450 ? '50%' : 250,
      },
      infoContainer: {
        justifyContent: 'center',
      },
      buttonText: {
        textAlign: 'center',
        ...estiloDeLetra.negrita,
        fontSize: widthScreen >= 450 ? 12 : 14,
        color: colores.dorado,
      },
      buttonContainer: {
        maxWidth: '80%',
        marginTop: 15,
        alignSelf: 'center',
        padding: widthScreen >= 450 ? 8 : 15,
        borderWidth: 1,
        borderColor: colores.dorado,
        backgroundColor: colores.blanco,
        borderRadius: 50,
      },
    });
  };

  return (
    <>
      <View style={getResponsiveStyles(width).mainContainer}>
        <View style={getResponsiveStyles(width).imageContainer}>
          <Image
            source={require('../../assets/img/carro_weprint.gif')}
            style={style.image}
          />
        </View>
        <View style={getResponsiveStyles(width).infoContainer}>
          <View style={style.emptyCestContainer}>
            <Text style={style.emptyCestText}>Tu cesta está vacía</Text>
            <Text style={style.emptyCestSecondText}>
              ¡Parece que aún no elegiste tus productos!
            </Text>
          </View>

          <TouchableOpacity
            delayPressIn={0}
            style={getResponsiveStyles(width).buttonContainer}
            onPress={onGoToFormatList}>
            <Text style={getResponsiveStyles(width).buttonText}>
              + AÑADIR UN PRODUCTO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  emptyCestContainer: {
    alignItems: 'center',
  },
  emptyCestText: {
    fontSize: RFPercentage(3),
    ...estiloDeLetra.negrita,
  },
  emptyCestSecondText: {
    fontSize: RFPercentage(2),
    ...estiloDeLetra.negrita,
  },
});

export default ProductCartAddItem;
