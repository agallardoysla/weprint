import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import TextView from './components/TextView';
import Container from '../../generales/Container';
import {Header} from './components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colores, estiloDeLetra} from '../../constantes/Temas';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

function Drafts({profilePhoto, route, items}) {
  console.log("route.params");
  console.log(items)

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f6fa'}}>
      <ScrollView>
        <Container footer={false}>
          <Header />
         
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const DraftCard = ({photo, available}) => (
  <View
    style={{
      width: '90%',
      backgroundColor: colores.blanco,
      alignSelf: 'center',
      marginVertical: 20,
      paddingBottom: 20,
      borderRadius: 5,
      elevation: 3,
    }}>
    <Image
      width="100%"
      source={{uri: photo}}
      style={{backgroundColor: 'blue', height: 275}}
    />
    <View style={{padding: 25}}>
      <Text style={{color: colores.gris}}>Album: 20 paginas $15000</Text>
      <Text
        style={{
          fontSize: RFPercentage(3),
          marginVertical: 10,
          ...estiloDeLetra.negrita,
        }}>
        Vacaciones en Bali
      </Text>
      <View
        style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
        <Icon
          name="calendar"
          style={{marginRight: 15, alignSelf: 'flex-start'}}
          size={20}
        />
        <Text>23 de Mayo de 2020</Text>
      </View>
      <Text style={{...estiloDeLetra.negrita, color: colores.gris}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500
      </Text>
    </View>
    {available === true ? (
      <View>
        <View
          style={{
            backgroundColor: colores.naranja,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 25,
            borderRadius: 5,
            padding: 3,
            marginBottom: 20,
          }}>
          <Icon name="eye" style={{marginHorizontal: 5}} size={20} />
          <Text style={{marginRight: 5, ...estiloDeLetra.negrita}}>
            Disponible
          </Text>
        </View>
        <View
          style={{
            width: '85%',
            padding: 15,
            backgroundColor: colores.logo,
            alignSelf: 'center',
            elevation: 4,
            borderRadius: 8,
          }}>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <Text
              style={{
                textAlign: 'center',
                ...estiloDeLetra.negrita,
                color: colores.blanco,
                fontSize: RFPercentage(2.2),
              }}>
              ¡TERMINAME!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View
        style={{
          backgroundColor: colores.rojo,
          flexDirection: 'row',
          alignSelf: 'flex-start',
          marginLeft: 25,
          borderRadius: 5,
          padding: 3,
          marginBottom: 20,
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
  </View>
);

const mapStateToProps = (state) => ({items: state.cart});
export default connect(mapStateToProps)(Drafts);

Drafts.defaultProps = {
  profilePhoto:
    'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg',
};
