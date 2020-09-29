import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import Logo from '../../assets/img/logo.svg';
import {MenuItem} from '../../generales/MenuItem';
import {estiloDeLetra} from '../../constantes/Temas';
import {PromoView} from './components/PromoView';
import {PromoMenuView} from './components/PromoMenuView';
import {RFPercentage} from 'react-native-responsive-fontsize';

function Home({login, dispatch, navigation}) {
  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  const handleGoToAlbumList = () =>{
    console.log("prop: "+navigation)
    navigation.navigate("AlbumList")
  }

  return (
    <Container>
      <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <View style={{margin: 10}}>
          <Logo height={110} width={110} />
        </View>
        <PromoView />
        <View style={{width: '90%'}}>
          <MenuItem
            name="Mis Proyectos"
            text="En estos momentos: 0"
            photo={
              'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg'
            }
            background='transparent'
            textStyle={{
              ...estiloDeLetra.negrita,
            }}
            onPressFunction={() => navigation.navigate('Home')}
            nameStyle={{color: '#000000'}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text
            style={{
              ...estiloDeLetra.negrita,
              marginVertical: 25,
              marginHorizontal: 20,
              fontSize: RFPercentage(3),
            }}>
            Crea tus proyectos
          </Text>
          <PromoMenuView onPress={() => handleGoToAlbumList} />
        </View>
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(Home);
