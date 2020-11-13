import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container';
import CargandoModal from '../../generales/CargandoModal';
import {ProfileMainView} from '../components/ProfileMainView';
import {MenuItem} from '../../generales/MenuItem';
import {Header} from '../../generales/Header';
import {colores} from '../../constantes/Temas';
import {get_profile_api} from '../../utils/apis/login_api';
import {actions} from '../../redux';

function Profile({navigation, dispatch}) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getUserData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await get_profile_api();
      setUserData(response.data[0]);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Container>
      <CargandoModal title="Cargando" show={loading} />
      <Header />
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}>
          {error ? (
            <View style={styles.buttonMainContainer}>
              <Text style={styles.errorText}>
                Ha ocurrido un problema, revisa tu conexión e inténtalo de
                nuevo.
              </Text>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={getUserData}>
                <Text style={styles.buttonText}>Volver a intentar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <ProfileMainView
                loading={loading}
                navigation={navigation}
                data={userData}
              />
              <View style={styles.menuContainer}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: '4%',
                    paddingVertical: '4%',
                  }}>
                  <MenuItem
                    name="Mis Compras"
                    icon="shopping-basket"
                    color="#f18263"
                  />
                  <MenuItem
                    name="Mis Borradores"
                    icon="edit"
                    color="#50c8ff"
                    onPressFunction={() =>
                      navigation.navigate('Drafts', userData.photo)
                    }
                  />
                  <MenuItem
                    name="Mis Albunes compartidos"
                    icon="insert-photo"
                    color="#5d58e0"
                    onPressFunction={() => navigation.navigate('Album')}
                  />
                  <MenuItem
                    name="Mis repositorios"
                    icon="folder"
                    color="#e0bb2e"
                    onPressFunction={() => navigation.navigate('Repositories')}
                  />
                  <MenuItem
                    name="Politicas de Privacidad"
                    icon="policy"
                    color="#ffd948"
                    onPressFunction={() => navigation.navigate('Policy')}
                  />
                  <MenuItem
                    name="Somos #Weprint"
                    icon="supervisor-account"
                    color="#ffd948"
                    onPressFunction={() => navigation.navigate('About')}
                    divider={false}
                  />
                </View>
              </View>
              <View style={styles.menuContainer}>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <MenuItem
                    name="Cerrar Sesion"
                    color="#ffd948"
                    onPressFunction={() => dispatch(actions.logout())}
                    divider={false}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  menuContainer: {
    alignItems: 'center',
    width: '90%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colores.blanco,
    marginTop: 10,
  },
  buttonMainContainer: {
    marginTop: '50%',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: '40%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: colores.blanco,
  },
  buttonText: {
    color: colores.logo,
    textAlign: 'center',
  },
  errorText: {
    width: 250,
    color: colores.logo,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(Profile);
