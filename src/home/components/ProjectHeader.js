import React from 'react';
import Logo from '../../assets/img/logo.svg';
import {View, Text, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {MenuItem} from '../../generales/MenuItem';
import {PromoView} from '../components/PromoView';
import {estiloDeLetra, tipoDeLetra, colores} from '../../constantes/Temas';

const ProjectHeader = () => (
  <View style={style.headerContainer}>
    <View style={style.logoContainer}>
      <Logo height={style.logo.height} width={style.logo.width} />
    </View>
    <PromoView />
    <View style={style.avatarContainer}>
      <MenuItem
        name="Mis Proyectos"
        text="En estos momentos: 0"
        photo={
          'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg'
        }
        background="transparent"
        textStyle={{
          ...estiloDeLetra.negrita,
        }}
        onPressFunction={() => navigation.navigate('Home')}
        nameStyle={{color: '#000000'}}
      />
    </View>
    <View style={style.projectsTextContainer}>
      <Text style={style.projectText}>Crea tus proyectos</Text>
    </View>
  </View>
);

const style = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    margin: 10,
  },
  logo: {
    height: 110,
    width: 110,
  },
  avatarContainer: {
    width: '90%',
  },
  projectText: {
    ...estiloDeLetra.negrita,
    marginTop: 20,
    //marginVertical: 25,
    marginHorizontal: 20,
    fontSize: RFPercentage(3),
  },
  projectsTextContainer: {
    width: '100%',
  },
});

export default ProjectHeader;
