import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import Cargando from '../../generales/Cargando';
import Logo from '../../assets/img/logo.svg';
import {MenuItem} from '../../generales/MenuItem';
import {estiloDeLetra, tipoDeLetra} from '../../constantes/Temas';
import {PromoView} from '../components/PromoView';
import ProjectCardView from '../components/ProjectCardView';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {get_projects_api} from '../../utils/apis/project_api';

function Home({dispatch, navigation}) {
  const [projects, setProjects] = useState([]);
  const [errorProject, setErrorProject] = useState(false);
  const [loadingProject, setLoadingProject] = useState(true);

  const loadData = useCallback(async () => {
    setErrorProject(false);
    setLoadingProject(true);
    try {
      const response = await get_projects_api();
      setProjects(response.data);
      setLoadingProject(false);
    } catch (error) {
      setErrorProject(true);
      setLoadingProject(false);
    }
  }, []);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  const handleOnPressGoToFormat = (projectId) =>
    navigation.navigate('FormatList', {projectId});

  const handleGoToAlbumList = () => {
    console.log('prop: ' + navigation);
    navigation.navigate('AlbumList');
  };
  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderProjectCards = ({item: project}) => (
    <ProjectCardView
      project={project}
      onPressGoToFormat={handleOnPressGoToFormat}
    />
  );

  return (
    <Container>
      <View style={style.mainContainer}>
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
        {loadingProject && <Cargando titulo="" />}
        {!loadingProject && !errorProject && (
          <FlatList
            style={style.projectsListContainer}
            contentContainerStyle={style.projectsListContent}
            data={projects}
            renderItem={renderProjectCards}
            keyExtractor={(project) => project.id.toString()}
          />
        )}
        {errorProject && (
          <View style={style.projectErrorContainer}>
            <Text style={style.projectErrorText}>
              En estos momentos no se pudieron cargar los datos :C
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
}
const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
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
  projectsTextContainer: {
    width: '100%',
  },
  projectsListContainer: {
    width: '100%',
  },
  projectsListContent: {
    paddingBottom: 60,
    paddingHorizontal: 12,
  },
  projectText: {
    ...estiloDeLetra.negrita,
    marginVertical: 25,
    marginHorizontal: 20,
    fontSize: RFPercentage(3),
  },
  projectErrorContainer: {
    alignItems: 'center',
  },
  projectErrorText: {
    marginLeft: 20,
    color: 'black',
    fontFamily: tipoDeLetra.regular,
    fontSize: RFPercentage(3),
  },
});
const mapStateToProps = (state) => ({login: state.login});

export default connect(mapStateToProps)(Home);
