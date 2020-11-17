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

function Drafts({carts, navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f6fa'}}>
      <ScrollView>
        <Container footer={false}>
          <Header />
          {carts.map((cart) => {
            const handleOnPressGoToDetail = () => {
              navigation.navigate('CartLayoutDetail', {
                cartId: cart.id,
                formatId: cart.format_id,
              });
            };
            return (
              <DraftCard
                key={cart.id.toString()}
                cart={cart}
                onPressFunction={handleOnPressGoToDetail}
              />
            );
          })}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const DraftCard = ({cart, onPressFunction}) => (
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
      source={{uri: cart.file}}
      style={{backgroundColor: colores.blanco, height: 275}}
    />
    <View style={{padding: 25}}>
      <Text style={{color: colores.gris}}>
        Álbum: {cart.name} páginas {cart.total_pages}
      </Text>
      <Text
        style={{
          fontSize: RFPercentage(3),
          marginVertical: 10,
          ...estiloDeLetra.negrita,
        }}>
        {cart.name}
      </Text>
      {/*
          <View
            style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
                <Icon
                name="calendar"
                style={{marginRight: 15, alignSelf: 'flex-start'}}
                size={20}
                />
                <Text>{date}</Text>
            </View>

            Agregar fecha para luego hacer el mapeo y pegar ahi
      */}
      <Text
        style={{...estiloDeLetra.negrita, color: colores.gris}}
        numberOfLines={4}>
        {cart.description}
      </Text>
    </View>
    {cart.active ? (
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
          <TouchableOpacity onPress={onPressFunction}>
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

const mapStateToProps = (state) => {
  const carts = state.cart.data.filter(
    (cart) => cart.status === 'draft' && cart.total_pages > 10,
  );

  return {carts};
};
export default connect(mapStateToProps)(Drafts);
