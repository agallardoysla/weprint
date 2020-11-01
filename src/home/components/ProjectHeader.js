import React from 'react';
import Logo from '../../assets/img/logo.svg';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {MenuItem} from '../../generales/MenuItem';
import ProjectDraft from './ProjectDraft';
import {estiloDeLetra, colores} from '../../constantes/Temas';

const ProjectHeader = ({carts, onPressGoToDetail}) => {
  const renderProjectDraft = ({item: cart}) => {
    return <ProjectDraft cart={cart} onPressGoToDetail={onPressGoToDetail} />;
  };

  return (
    <View style={style.center}>
      <View style={style.logoContainer}>
        <Logo height={style.logo.height} width={style.logo.width} />
      </View>
      {carts.length > 0 && (
        <FlatList
          horizontal
          style={style.projectsListContainer}
          data={carts}
          renderItem={renderProjectDraft}
          keyExtractor={(cart) => cart.id.toString()}
        />
      )}

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
          onPressFunction={() => {}}
          nameStyle={{color: colores.negro}}
        />
      </View>
      <View style={style.projectsTextContainer}>
        <Text style={style.projectText}>Crea tus proyectos</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  logoContainer: {
    marginVertical: 10,
  },
  logo: {
    height: 110,
    width: 110,
  },
  avatarContainer: {
    marginHorizontal: 10,
    width: '100%',
  },
  projectText: {
    ...estiloDeLetra.negrita,
    fontSize: 18,
  },
  projectsTextContainer: {
    marginVertical: 20,
    paddingLeft: 10,
    width: '100%',
  },
  projectsListContainer: {
    marginBottom: 10,
  },
});

export default ProjectHeader;
