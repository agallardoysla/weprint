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
      {!loading && (
        <>
          <Header />
          <View style={style.mainContainer}>
            <ScrollView contentContainerStyle={style.scrollContent}>
              <>
                {error ? (
                  <View style={style.buttonMainContainer}>
                    <Text style={style.errorText}>
                      Ha ocurrido un problema, revisa tu conexión e inténtalo de
                      nuevo.
                    </Text>

                    <TouchableOpacity
                      style={style.buttonContainer}
                      onPress={getUserData}>
                      <Text style={style.buttonText}>Volver a intentar</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <ProfileMainView
                      loading={loading}
                      navigation={navigation}
                      data={userData}
                    />
                    <View style={style.menuContainer}>
                      <View style={style.menuContent}>
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
                          onPressFunction={() =>
                            navigation.navigate('Repositories')
                          }
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
                    <View style={style.menuContainer}>
                      <View style={style.logoutContent}>
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
              </>
            </ScrollView>
          </View>
        </>
      )}
    </Container>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  logoutContent: {
    width: '100%',
  },
  menuContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colores.blanco,
  },
  menuContent: {
    width: '100%',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
  },
  scrollContent: {
    paddingBottom: 60,
    alignItems: 'center',
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
