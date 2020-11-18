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
import Drafts from './profile/menuScreens/Drafts';
import PaidAlbums from './profile/menuScreens/PaidAlbums';

import Repositories from './profile/menuScreens/Repositories';
import UploadRepository from './profile/menuScreens/UploadRepository';
import RepositoryDescription from './profile/menuScreens/RepositoryDescription';
import RepositoryRequest from './profile/menuScreens/RepositoryRequest';
import EditProfile from './editProfile/containers/EditProfile';
import AlbumList from './home/containers/screens/AlbumList';
import AlbumDescription from './home/containers/screens/AlbumDescription';

import CartMainView from './cart/containers/CartMainView';
import ConfirmCart from './cart/containers/ConfirmCart';
import FormatList from './format/list/containers/FormatList';
import CartLayoutDetail from './cartLayout/detail/containers/CartLayoutDetail';
import EditCartLayoutImage from './cartLayout/edit/containers/EditCartLayoutImage';
import FormatDetail from './format/detail/containers/FormatDetail';
import CartLayoutCreate from './cartLayout/create/containers/CartLayoutCreate';
import RememberPassword from './rememberPassword/containers/RememberPassword';
import ChangePassword from './changePassword/containers/ChangePassword';

import Album from './profile/menuScreens/Album';
import AlbumRequest from './profile/menuScreens/AlbumRequest';

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
      <AuthStack.Screen name="Profile" component={ProfileNavigator} />

      <AuthStack.Screen name="Cart" component={CartMainView} />
      <AuthStack.Screen
        name="ConfirmCart"
        component={ConfirmCart}
        options={{headerShown: true, title: ''}}
      />
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
      <AuthStack.Screen name="RememberPassword" component={RememberPassword} />
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
    </AuthStack.Navigator>
  );

  return (
    <NavigationContainer>
      {login.login ? <AppDrawerScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

const ProfileTab = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileTab.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerShown: false,
    }}>
    <ProfileTab.Screen name="Profile" component={Profile} />
    <ProfileTab.Screen name="Policy" component={Policy} />
    <ProfileTab.Screen name="Drafts" component={Drafts} />
    <ProfileTab.Screen name="Album" component={AlbumsTabScreen} />
    <ProfileTab.Screen name="Repositories" component={RepositoriesTabScreen} />
    <ProfileTab.Screen name="About" component={About} />
    <ProfileTab.Screen name="PaidAlbums" component={PaidAlbums} />

    <ProfileTab.Screen name="EditProfile" component={EditProfile} />
  </ProfileTab.Navigator>
);

const RepositoriesTab = createStackNavigator();
const RepositoriesTabScreen = () => (
  <RepositoriesTab.Navigator
    initialRouteName="Repositories"
    screenOptions={{
      headerShown: false,
    }}>
    <RepositoriesTab.Screen name="Repositories" component={Repositories} />
    <RepositoriesTab.Screen
      name="UploadRepository"
      component={UploadRepository}
    />
    <RepositoriesTab.Screen
      name="RepositoryDescription"
      component={RepositoryDescription}
    />
    <RepositoriesTab.Screen
      name="RepositoryRequest"
      component={RepositoryRequest}
    />
  </RepositoriesTab.Navigator>
);

const AlbumsTab = createStackNavigator();
const AlbumsTabScreen = () => (
  <AlbumsTab.Navigator
    initialRouteName="Album"
    screenOptions={{
      headerShown: false,
    }}>
    <AlbumsTab.Screen name="Album" component={Album} />
    <AlbumsTab.Screen name="AlbumRequest" component={AlbumRequest} />
  </AlbumsTab.Navigator>
);

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(Navegador);
