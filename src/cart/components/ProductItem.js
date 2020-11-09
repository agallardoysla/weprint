import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import has from 'lodash/has';
import {colores, estiloDeLetra} from '../../constantes/Temas';

export const ProductItem = ({item}) => {
  const uri = has(item, 'pages') ? item.pages[0].pieces[0].file : item.file;

  return (
    <View style={{width: '100%', flexDirection: 'row'}}>
      <Image
        source={{uri}}
        style={{
          height: 50,
          width: 50,
          marginLeft: 20,
          borderRadius: 100,
          alignSelf: 'center',
        }}
      />
      <View style={{marginLeft: 20, marginVertical: 20, width: '50%'}}>
        <Text style={{...estiloDeLetra.negrita, fontSize: RFPercentage(2.25)}}>
          {item.name}
        </Text>
        <Text style={{...estiloDeLetra.negrita}} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <View
            style={{
              backgroundColor: colores.blanco,
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              marginHorizontal: 15,
              borderRadius: 10,
            }}>
            <TouchableHighlight>
              <Text style={{textAlign: 'center', color: colores.naranja}}>
                +
              </Text>
            </TouchableHighlight>
          </View>
          <TextInput
            placeholder="xd"
            keyboardType="number-pad"
            contextMenuHidden={true}
            defaultValue={1}
            style={{
              width: 30,
              paddingHorizontal: 30,
              paddingVertical: 5,
              backgroundColor: colores.blanco,
              borderRadius: 15,
            }}
          />
          <View
            style={{
              backgroundColor: colores.blanco,
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              marginHorizontal: 15,
              borderRadius: 10,
            }}>
            <TouchableHighlight>
              <Text style={{textAlign: 'center', color: colores.naranja}}>
                -
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View
          style={{height: 1, width: '200%', backgroundColor: colores.gris}}
        />
      </View>
      <View
        style={{
          marginLeft: 'auto',
          marginRight: 20,
          alignSelf: 'center',
          backgroundColor: colores.rojo,
          padding: 8,
          borderRadius: 10,
        }}>
        <TouchableHighlight>
          <Text style={{color: colores.blanco}}>Eliminar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
