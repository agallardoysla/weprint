import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {tipoDeLetra, colores} from '../../../constantes/Temas';

export const PromoMenuView = () => {
  return (
    <View
      style={{
        width: '95%',
        height: '55%',
        alignSelf: 'center',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
      <Image
        source={require('../../../assets/img/album2.jpeg')}
        resizeMode='cover'
        style={{width: '100%', height: '100%'}}
      />
      <View
        style={{
          width: '100%',
          height: '35%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        <Text
          style={{
            color: colores.blanco,
            fontSize: RFPercentage(3.5),
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          ALBUM
        </Text>
      </View>
    </View>
  );
};
