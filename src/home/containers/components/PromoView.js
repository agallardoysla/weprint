import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {tipoDeLetra, colores} from '../../../constantes/Temas';

export const PromoView = () => {
  return (
    <View
      style={{
        width: '95%',
        height: '20%',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
      }}>
      <Image
        style={{resizeMode: 'contain', width: '100%', height: '100%'}}
        source={require('../../../assets/img/slidetab1.png')}
      />
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.25)',
        }}>
        <View style={{marginHorizontal: '5%', marginTop: '5%',}}>
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              fontFamily: tipoDeLetra.bold,
              fontWeight: 'bold',
              color: colores.blanco,
              width: '60%',
            }}>
            Tus recuerdos más mágicos
          </Text>
          <Text
            style={{
              color: colores.blanco,
              fontFamily: tipoDeLetra.bold,
              fontWeight: 'bold',
            }}>
            -20% en tu pedido
          </Text>
        </View>
      </View>
    </View>
  );
};
