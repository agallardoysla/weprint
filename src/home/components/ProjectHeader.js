import React from 'react';
import Logo from '../../assets/img/logo.svg';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ProjectDraft from './ProjectDraft';
import ProjectCardCount from './ProjectCardCount';
import Cargando from '../../generales/Cargando';
import {colores} from '../../constantes/Temas';

const ProjectHeader = ({carts, loading, onPressGoToDetail}) => {
  const renderProjectDraft = ({item: cart}) => {
    return <ProjectDraft cart={cart} onPressGoToDetail={onPressGoToDetail} />;
  };

  return (
    <View style={style.center}>
      <View style={style.logoContainer}>
        <Logo height={style.logo.height} width={style.logo.width} />
      </View>
      {loading ? (
        <Cargando
          loaderColor={colores.logo}
          titulo="Cargando carritos..."
          tituloStyle={style.loaderTitle}
        />
      ) : (
        <>
          {carts.length > 0 && (
            <FlatList
              horizontal
              style={style.projectsListContainer}
              contentContainerStyle={style.projectListContent}
              data={carts}
              renderItem={renderProjectDraft}
              keyExtractor={(cart) => cart.id.toString()}
            />
          )}
          <ProjectCardCount cartsAmount={carts.length} />
        </>
      )}

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
    marginTop: 10,
    marginBottom: 18,
    height: 110,
    width: '35%',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  loaderTitle: {
    marginBottom: 10,
    color: colores.gris,
  },
  projectsListContainer: {
    marginBottom: 20,
  },
  projectListContent: {
    paddingLeft: 4,
  },
  projectsTextContainer: {
    marginVertical: 25,
    paddingLeft: 16,
    width: '100%',
  },
  projectText: {
    color: colores.negro,
    fontWeight: '500',
    fontSize: 20,
  },
});

export default ProjectHeader;
