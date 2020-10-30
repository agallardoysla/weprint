import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {
  get_repository_request,
  post_repository_request,
  accept_repository_request,
} from '../../utils/apis/repository_api';
import {RequestView} from '../components/RequestView';
import CargandoModal from '../../generales/CargandoModal';
import Container from '../../generales/Container';
import {colores, estiloDeLetra} from '../../constantes/Temas';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';

function RepositoryRequest({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [emailToSend, setEmailToSend] = useState(null);
  const [repositoryRequest, setRepositoryRequest] = useState([]);
  const [error, setError] = useState(false);
  const [emailToSendValidation, setEmailToSendValidation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  console.log(repositoryRequest);

  useEffect(() => {
    get_repository_request().then((response) => {
      setRepositoryRequest(response.data);
      console.log(response);
      setLoading(false);
    });
  }, []);

  const handleSendRequest = async () => {
    if (emailToSend) {
      setLoading(true);
      const body = {
        repository_id: route.params.repoId,
        email_to: emailToSend.trim(),
      };
      post_repository_request(body).then((result) => {
        console.log(result);
        setLoading(false);
        result.errors && setError(true);
        result.success === true && setSuccessMessage(true);
      });
    } else {
      setEmailToSendValidation(true);
    }
  };

  const acceptRepositoryRequest = (id) => {
    setLoading(true);
    const sharedIdRequest = {
      shared_id: id,
    };

    accept_repository_request(sharedIdRequest).then((data) => {
      console.log(data);
      setLoading(false);
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F6FA'}}>
      <CargandoModal show={loading} title={'Cargando'} />
      {route.params ? (
        <View style={{width: '100%', alignItems: 'center', marginVertical: 30}}>
          <Text
            style={{
              ...estiloDeLetra.negrita,
              fontSize: RFPercentage(2.3),
              width: '80%',
              textAlign: 'center',
              marginVertical: '5%',
            }}>
            Escriba el correo electronico a quién quieres compartir el album
          </Text>
          <TextInput
            style={styles.Input}
            placeholder={'CORREO ELECTRONICO'}
            autoCapitalize="none"
            autoCapitalize="none"
            placeholderTextColor={colores.button}
            onChangeText={(e) => setEmailToSend(e)}
          />
        </View>
      ) : null}
      <ScrollView>
        <Container footer={false}>
          <View style={{marginTop: '15%'}} />
          {repositoryRequest.map((request, index) => (
            <RequestView
              key={index}
              username={request.from_user_fullname}
              fullName={request.to_user_fullname}
              onPressFunction={() => acceptRepositoryRequest(request.shared_id)}
            />
          ))}
        </Container>
      </ScrollView>
      {emailToSendValidation === true && successMessage === false && (
        <Animatable.View animation="bounceIn">
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Completa la informacion !
          </Text>
        </Animatable.View>
      )}
      {successMessage === true && (
        <Animatable.View animation="bounceIn">
          <Text
            style={{
              color: colores.button,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Compartido Exitosamente !
          </Text>
        </Animatable.View>
      )}
      {route.params ? (
        <TouchableOpacity onPress={handleSendRequest}>
          <View
            style={{
              padding: 20,
              backgroundColor: colores.button,
              width: 190,
              borderRadius: 50,
              margin: 5,
              alignSelf: 'center',
              marginBottom: '15%',
            }}>
            <Text
              style={{
                ...estiloDeLetra.negrita,
                color: colores.blanco,
                textAlign: 'center',
                fontSize: RFPercentage(1.5),
              }}>
              ACEPTAR
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Input: {
    height: 65,
    width: '80%',
    paddingLeft: 20,
    elevation: 0.75,
    borderRadius: 50,
    backgroundColor: colores.blanco,
    ...estiloDeLetra.negrita,
    textAlign: 'center',
    elevation: 2.5,
    marginVertical: 10,
  },
});

export default RepositoryRequest;
