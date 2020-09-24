/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import Login from './login/containers/Login';
import Register from './register/containers/Register';

const Navegador = (props) => {
  const {login} = props
  const Stack = createStackNavigator();

  const AppDrawer = createStackNavigator();
  const AppDrawerScreen = () => (
      <AppDrawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <AuthStack.Screen name="Home" component={Home} />
      </AppDrawer.Navigator>
  )

  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator initialRouteName="SignUp" screenOptions={{
      headerShown: false,
    }} >
      <AuthStack.Screen name="SignIn" component={Register} />
      <AuthStack.Screen name="SignUp" component={Login} />
    </AuthStack.Navigator>
  )

  return (
    <NavigationContainer>
      {
        login.login ? (
          <AppDrawerScreen />
        ) : (
          <AuthStackScreen />
        )
      }
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(Navegador);
