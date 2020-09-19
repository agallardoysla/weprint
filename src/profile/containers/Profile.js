import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container'
import { ProfileMainView } from '../components/ProfileMainView'
import { MenuList } from '../../generales/MenuList'
import { menu } from '../../constantes/Menu'
import { colores } from '../../constantes/Temas';

function Profile(props) {

  return (
      <Container>
                <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    <ProfileMainView />
                    <MenuList list={menu} />
                    <MenuList list={[{name: 'Cerrar sesión', color: colores.rojo}]} />  
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
});

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(Profile);