import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container';
import CargandoModal from '../../generales/CargandoModal'
import {ProfileMainView} from '../components/ProfileMainView';
import {MenuItem} from '../../generales/MenuItem';
import { Header } from '../../generales/Header'
import {colores} from '../../constantes/Temas';
import { get_profile_api } from '../../utils/apis/login_api'
import {actions} from '../../redux';

function Profile({navigation, dispatch}) {
  
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = get_profile_api().then((data) =>{
      setUserData(data.data[0])
      setLoading(false)
    });
  }, [])

  console.log(userData)

  return (
    <Container>
      <CargandoModal title="Cargando" show={loading} />
      <Header />
      <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <ProfileMainView navigation={navigation} data={userData} />
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
              onPressFunction={() => navigation.navigate('Drafts', userData.photo)}
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
      </View>
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
});

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(Profile);