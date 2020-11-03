import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Alert
} from 'react-native';
import Container from '../../generales/Container';
import {colores, estiloDeLetra} from '../../constantes/Temas';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {get_repositories, delete_repository} from '../../utils/apis/repository_api';
import {ProjectPreview} from '../components/ProjectPreview';
import Icon from 'react-native-vector-icons/FontAwesome';
import CargandoModal from '../../generales/CargandoModal';

function Repositories({route, cover, navigation}) {
  const [repositoriesData, setRepositoriesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_repositories().then((data) => {
      setRepositoriesData(data.data);
      console.log(data);
      setLoading(false);
    });
  }, [loading]);

  const handleDeleteRepository = (repoId) => {
    Alert.alert(
      'Borrar Repositorio',
      'Deseas eliminar este repositorio ?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            setLoading(true)
            delete_repository(repoId)
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleGoToRepository = (id, name, code) => {
    navigation.navigate('RepositoryDescription', {
      repoName: name,
      repoCode: code,
      repoId: id
  })
  }
  console.log(repositoriesData);
  const photo = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F6FA'}}>
      <CargandoModal show={loading} title={'Cargando'} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UploadRepository')}>
          <View
            style={{
              padding: 20,
              backgroundColor: colores.button,
              width: 190,
              borderRadius: 50,
              margin: 5,
            }}>
            <Text
              style={{
                ...estiloDeLetra.negrita,
                color: colores.blanco,
                textAlign: 'center',
                fontSize: RFPercentage(1.5),
              }}>
              + CREAR REPOSITORIO
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RepositoryRequest")}>
          <View
            style={{
              padding: 20,
              backgroundColor: colores.button,
              width: 190,
              borderRadius: 50,
              margin: 5,
            }}>
            <Text
              style={{
                ...estiloDeLetra.negrita,
                color: colores.blanco,
                textAlign: 'center',
                fontSize: RFPercentage(1.5),
              }}>
              SOLICITUDES
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Container footer={false}>
          <View style={{marginTop: 25}}>
            {repositoriesData &&
              repositoriesData.map((repository) =>
                <ProjectPreview
                  title={repository.name}
                  totalPieces={repository.totalPieces}
                  totalShared={repository.totalShared}
                  coverPhoto={repository.lastImage}
                  available={repository.available === 1 ? true : false}
                  onPressDelete={() => handleDeleteRepository(repository.id)}
                  onPressFunction={() =>
                    handleGoToRepository(
                      repository.id,
                      repository.name,
                      repository.code,
                    )
                  }
                />
              )}
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Repositories;

Repositories.defaultProps = {
  cover:
    'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg',
}
