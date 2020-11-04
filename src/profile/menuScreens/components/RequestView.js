import React from 'react';
import {View, Text, Image} from 'react-native';
import {colores, estiloDeLetra} from '../../../constantes/Temas';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const RequestView = ({username, fullName, onPressFunction}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      backgroundColor: colores.blanco,
      padding: 15,
      alignSelf: 'center',
      marginVertical: 10,
      elevation: 2
    }}>
    <View style={{width: '25%'}}>
      <Image
        style={{
          height: 80,
          width: 80,
          borderRadius: 100,
          backgroundColor: 'red',
        }}
      />
    </View>
    <View style={{marginLeft: 10, width: '45%'}}>
      <Text style={{...estiloDeLetra.negrita, fontSize: RFPercentage(1.75)}}>
        Insertar Nombre
      </Text>
      <Text
        style={{
          ...estiloDeLetra.negrita,
          fontSize: RFPercentage(1.75),
          color: colores.rojoAtenuado,
        }}>
        {username}
      </Text>
      <Text style={{fontSize: RFPercentage(1.25), marginTop: 2.5, color: colores.grisOscuro}}>Bárbara Antonia Cortés López</Text>
    </View>
    <View>
    <TouchableOpacity style={{marginLeft: 20, marginVertical: 5}} onPress={onPressFunction} >
      <View style={{backgroundColor: colores.agregar, paddingVertical: 5, borderRadius: 50, paddingHorizontal: 10}}>
        <Text style={{...estiloDeLetra.negrita, fontSize: RFPercentage(1.25), color: colores.blanco}}>ACEPTAR</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={{marginLeft: 20}}>
      <View style={{backgroundColor: colores.rojoBrillante, paddingVertical: 5, borderRadius: 50, paddingHorizontal: 10}}>
        <Text style={{...estiloDeLetra.negrita, fontSize: RFPercentage(1.25), color: colores.blanco}}>ELIMINAR</Text>
      </View>
    </TouchableOpacity>
    </View>
  </View>
);
