import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {colores, estiloDeLetra} from '../../../constantes/Temas';
import {RFPercentage} from 'react-native-responsive-fontsize';
import EmptyRequestIllustration from '../../../assets/img/emptyRequestIllustration.svg';

export const RequestEmpty = ({resize}) => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: resize === false ? '30%' : '0%',
      justifyContent: 'center'
    }}>
    <Text
      style={{
        ...estiloDeLetra.negrita,
        fontSize: RFPercentage(3),
        width: '80%',
        textAlign: 'center',
        marginBottom: 40,
      }}>
      No tienes solicitudes por el momento 😃
    </Text>
    <EmptyRequestIllustration height={250} width={250} />
  </View>
);
