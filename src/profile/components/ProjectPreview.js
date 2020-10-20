import React from 'react';
import {View, Text, Image} from 'react-native';
import {colores, estiloDeLetra} from '../../constantes/Temas';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ProjectPreview = ({
  title = 'default',
  users,
  coverPhoto,
  available = true,
  totalPieces = 20,
  totalShared = 3,
  onPressDelete,
}) => (
  <View
    style={{
      borderRadius: 25,
      width: '95%',
      alignSelf: 'center',
      backgroundColor: colores.blanco,
      borderRadius: 25,
      overflow: 'hidden',
      marginBottom: 40,
    }}>
    <Image
      source={coverPhoto ? {uri:  coverPhoto } : require('../../assets/img/upload_cover.jpg')}
      style={{width: '100%', height: 250, borderRadius: 25}}
    />
    <View style={{padding: 20}}>
      {available === true ? (
        <View>
          <View
            style={{
              backgroundColor: colores.naranja,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              borderRadius: 5,
              padding: 3,
              marginBottom: 5,
            }}>
            <Icon name="eye" style={{marginHorizontal: 5}} size={20} />
            <Text style={{marginRight: 5, ...estiloDeLetra.negrita}}>
              Disponible
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: colores.rojo,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            borderRadius: 5,
            padding: 3,
            marginBottom: 5,
          }}>
          <Icon
            name="eye-slash"
            style={{marginLeft: 5}}
            size={20}
            color={colores.blanco}
          />
          <Text
            style={{
              marginHorizontal: 10,
              ...estiloDeLetra.negrita,
              color: colores.blanco,
            }}>
            No Disponible
          </Text>
        </View>
      )}
      <Text
        style={{
          ...estiloDeLetra.negrita,
          fontSize: RFPercentage(2),
          marginBottom: 20,
        }}>
        {title}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="users"
            style={{marginHorizontal: 5}}
            size={20}
            color={colores.gris}
          />
          <Text style={{color: colores.gris}}>{totalShared}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="image"
            style={{marginHorizontal: 5}}
            size={20}
            color={colores.gris}
          />
          <Text style={{color: colores.gris}}>{totalPieces}</Text>
        </View>
        {onPressDelete && available === true && (
          <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
            <Icon name="trash" size={25} color={colores.rojoBrillante} onPress={onPressDelete} />
          </View>
        )}
      </View>
    </View>
  </View>
)
