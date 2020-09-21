import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import Logo from '../../assets/img/logo.svg';
import {MenuItem} from '../../generales/MenuItem';
import {tipoDeLetra} from '../../constantes/Temas';
import {PromoView} from './components/PromoView'

function Home({login, dispatch, navigation}) {
  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  return (
    <Container>
      <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <View style={{margin: 10}}>
          <Logo height={110} width={110} />
        </View>
        <PromoView />
        <View style={{width: '100%'}}>
          <MenuItem
            name="Mis Proyectos"
            text="En estos momentos: 0"
            photo={
              'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg'
            }
            navigation={navigation}
            textStyle={{
              color: '#000000',
              FontFamily: tipoDeLetra.bold,
              fontWeight: 'bold',
            }}
            routeName="Home"
          />
        </View>
        <View>
            <Text>Crea tus proyectos</Text>
        </View>
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(Home);
