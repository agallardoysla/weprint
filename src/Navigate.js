/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './home/containers/Home';
import Profile from './profile/containers/Profile'
import Policy from './profile/menuScreens/Policy'
import About from './profile/menuScreens/About'
import EditProfile from './editProfile/containers/EditProfile'

import { colores } from './constantes/Temas'

const Navegador = (props) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Policy" component={Policy} 
          options={{ title: "Políticas de privacidad", headerShown: true, headerTintColor: colores.gris, headerTitleStyle: { color: 'black' }}} 
        />
        <Stack.Screen name="AboutUs" component={About} 
          options={{ title: "Somos #Wepint", headerShown: true, headerTintColor: colores.gris, headerTitleStyle: { color: 'black' }}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(Navegador);
