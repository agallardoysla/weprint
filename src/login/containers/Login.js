/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather'

import * as Animatable from 'react-native-animatable';
import LinearGradientButton from 'react-native-linear-gradient';


//importaciones necesarias para redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';
import Container from '../../generales/Container';
import { tamañoLetra } from '../../constantes/Temas'


// components
import LoginInput from '../components/LayoutInput';
import LayoutInput from '../components/LayoutInput';
import CardLogin from '../components/CardLogin';
import SvgBackground from '../components/LoginSvg'
import logo from '../../../assets/images/logo_blanco.png';
import LoginSvg from '../components/LoginSvg'


import Background from '../../../assets/images/svg/login.svg';

// styles
import styles from '../styles/styles';

// redux
import { actualizarLogin } from '../../redux/reducer/login'

//services
import { login_api } from '../../utils/apis/login_api'

function Login(props) {
  const { login, dispatch, navigation } = props;
  const [loading, setloading] = useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });


  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }


  const loginHandle = async () => {
    let body = {
      email: data.email,
      password: data.password
    }

    let request = dispatch(actualizarLogin(login))
    return request;
  }

  return (

    <Container footer={false} style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor='#ff7b7f' barStyle="light-content" />
        <View style={{ height: 30, width: '100%' }}>
          <Background width={'100%'} height={83} />
        </View>
        <Image source={logo} alt='' style={[styles.logo, { width: '80%' }]} />
        <View>
          <CardLogin>
            <Text style={styles.titleform}>Login</Text>
            <Text style={styles.subtitleform}>Ingresa a tu email y contraseña para acceder a la aplicación</Text>

            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Email</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={'Email'}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />
              {data.isValidUser ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa un email valido</Text>
                </Animatable.View>
              }
            </View>

            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Password</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={'Password'}
                autoCapitalize="none"
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
              />
              {data.isValidPassword ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa un password valido</Text>
                </Animatable.View>
              }
            </View>


            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { loginHandle() }}
            >
              <LinearGradientButton
                colors={['#f18263', '#ff7b7f']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Ingresar</Text>
              </LinearGradientButton>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
          </CardLogin>


          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signUp}
              onPress={() => console.log('val')}
            >
              <LinearGradientButton
                colors={['#FFF', '#FFF']}
                style={styles.signUp}
              >
                <Text style={[styles.textSignUp, {
                  color: '#f18263'
                }]}>Sign Up</Text>
              </LinearGradientButton>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}


const mapStateToProps = (state) => ({ login: state.login });
export default connect(mapStateToProps)(Login);
