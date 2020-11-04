import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {tipoDeLetra, colores} from '../../constantes/Temas';
import map from 'lodash/map';
import Cargando from '../../generales/Cargando';
import Container from '../../generales/Container';
import ProjectCardView from '../components/ProjectCardView';
import ProjectHeader from '../components/ProjectHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {get_projects_api} from '../../utils/apis/project_api';

function Home({dispatch, navigation, carts}) {
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

  const handleOnPressGoToFormat = (projectId) =>
    navigation.navigate('FormatList', {projectId});

  const handleOnPressGoToDetail = (cart) => {
    navigation.navigate('CartLayoutDetail', {
      cartId: cart.id,
      formatId: cart.format_id,
    });
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  const renderProjectCards = ({item: project}) => (
    <ProjectCardView
      project={project}
      onPressGoToFormat={handleOnPressGoToFormat}
    />
  );

  return (
    <Container>
      {loadingProject && (
        <View style={style.loaderContainer}>
          <Cargando titulo="" loaderColor={colores.logo} />
        </View>
      )}

      {!loadingProject && !errorProject && (
        <FlatList
          ListHeaderComponent={
            <ProjectHeader
              carts={carts}
              onPressGoToDetail={handleOnPressGoToDetail}
            />
          }
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
    </Container>
  );
}
const style = StyleSheet.create({
  loaderContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectsListContainer: {
    width: '100%',
  },
  projectsListContent: {
    paddingHorizontal: 10,
  },
  projectErrorContainer: {
    alignItems: 'center',
  },
  projectErrorText: {
    marginLeft: 20,
    color: colores.negro,
    fontFamily: tipoDeLetra.regular,
    fontSize: RFPercentage(3),
  },
});
const mapStateToProps = (state) => {
  return {
    carts: [],
  };
};

export default connect(mapStateToProps)(Home);
