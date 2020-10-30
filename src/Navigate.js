import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import Home from './Home';
import Login from './login/containers/Login';
import Register from './register/containers/Register';
import Home from './home/containers/Home';
import Profile from './profile/containers/Profile';

import Policy from './profile/menuScreens/Policy';
import About from './profile/menuScreens/About';
import EditProfile from './editProfile/containers/EditProfile';
import AlbumList from './home/containers/screens/AlbumList';
import AlbumDescription from './home/containers/screens/AlbumDescription';

import CartMainView from './cart/containers/CartMainView';
import FormatList from './format/list/containers/FormatList';
import CartLayoutDetail from './cartLayout/detail/containers/CartLayoutDetail';
import EditCartLayoutImage from './cartLayout/edit/containers/EditCartLayoutImage';
import FormatDetail from './format/detail/containers/FormatDetail';
import CartLayoutCreate from './cartLayout/create/containers/CartLayoutCreate';

import {colores} from './constantes/Temas';

const Navegador = (props) => {
  const {login} = props;
  const Stack = createStackNavigator();

  const AppDrawer = createStackNavigator();
  const AppDrawerScreen = () => (
    <AppDrawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Profile" component={Profile} />
      <AuthStack.Screen name="Policy" component={Policy} />
      <AuthStack.Screen name="About" component={About} />
      <AuthStack.Screen name="EditProfile" component={EditProfile} />
      <AuthStack.Screen name="Cart" component={CartMainView} />
      <AuthStack.Screen
        name="AlbumList"
        component={AlbumList}
        options={{headerShown: true, title: ''}}
      />
      <AuthStack.Screen
        name="AlbumDescription"
        component={AlbumDescription}
        options={{headerShown: true, title: ''}}
      />
      <AuthStack.Screen name="FormatList" component={FormatList} />
      <AuthStack.Screen name="CartLayoutDetail" component={CartLayoutDetail} />
      <AuthStack.Screen
        name="EditCartLayoutImage"
        component={EditCartLayoutImage}
      />
      <AuthStack.Screen name="FormatDetail" component={FormatDetail} />
      <AuthStack.Screen name="CartLayoutCreate" component={CartLayoutCreate} />
    </AppDrawer.Navigator>
  );

  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="SignIn" component={Register} />
      <AuthStack.Screen name="SignUp" component={Login} />
    </AuthStack.Navigator>
  );

  return (
    <NavigationContainer>
      {login.login ? <AppDrawerScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(Navegador);
