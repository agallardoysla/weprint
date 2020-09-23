import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container';
import {ProfileMainView} from '../components/ProfileMainView';
import {MenuItem} from '../../generales/MenuItem';
import {colores} from '../../constantes/Temas';

function Profile({navigation}) {
  console.log('navigate: ' + navigation);
  return (
    <Container>
      <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <ProfileMainView navigation={navigation} />
        <View style={styles.menuContainer}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: '5%',
              paddingVertical: '5%',
            }}>
            <MenuItem
              name="Mis Compras"
              icon="shopping-basket"
              color="#f18263"
            />
            <MenuItem name="Mis Borradores" icon="edit" color="#50c8ff" />
            <MenuItem
              name="Mis Albunes compartidos"
              icon="insert-photo"
              color="#5d58e0"
            />
            <MenuItem name="Mis repositorios" icon="folder" color="#e0bb2e" />
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
              onPressFunction={() => navigation.navigate('AboutUs')}
              divider={false}
            />
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: '5%',
              paddingVertical: '5%',
            }}>
            <MenuItem
              name="Cerrar Sesion"
              color="#ffd948"
              onPressFunction={() => console.log('Session')}
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
