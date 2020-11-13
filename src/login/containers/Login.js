import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradientButton from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import {colores} from '../../constantes/Temas';
import CardLogin from '../components/CardLogin';
import logo from '../../../assets/images/logo_blanco.png';
import Background from '../../../assets/images/svg/login.svg';
import styles from '../styles/styles';
import {actualizarLogin} from '../../redux/reducer/login';
import {login_api} from '../../utils/apis/login_api';
import CargandoModal from '../../generales/CargandoModal';

function Login({dispatch, navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [error, setError] = useState(false);

  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleOnPressGoToChangePassword = () =>
    navigation.navigate('RememberPassword');

  const loginHandle = async () => {
    let body = {
      email: data.email,
      password: data.password,
    };

    if (data.isValidPassword && data.isValidUser) {
      setError(false);
      setLoading(true);
      try {
        const response = await login_api(body);

        if (response.success) {
          dispatch(actualizarLogin());
        }

        if (response.errors) {
          setError(true);
        }

        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  return (
    <Container footer={false}>
      <CargandoModal title="Validando, por favor espere..." show={loading} />
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'handled'}>
        <StatusBar
          backgroundColor={colores.grisClaro}
          barStyle="light-content"
        />
        <View style={{height: 30, width: '100%'}}>
          <Background width={'100%'} height={95} />
        </View>
        <Image source={logo} style={[styles.logo, {width: '80%'}]} />
        <View>
          <CardLogin>
            <Text style={styles.titleform}>Login</Text>
            <Text style={styles.subtitleform}>
              Ingresa a tu email y contraseña para acceder a la aplicación
            </Text>
            {error && !loading && (
              <Text
                style={{color: 'red', textAlign: 'center', marginVertical: 10}}>
                * Email y/o contraseña es incorrecto
              </Text>
            )}
            <View style={styles.action}>
              <Text style={{marginVertical: 10}}>Email</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={'nombre@tudominio.com'}
                autoCapitalize="none"
                onChangeText={(val) =>
                  setData({
                    ...data,
                    email: val.trim(),
                    check_textInputChange: true,
                    isValidUser:
                      val.trim().length >= 4 && regexMail.test(val.trim()),
                  })
                }
                onEndEditing={(e) => {
                  setData({
                    ...data,
                    isValidUser:
                      e.nativeEvent.text.trim().length >= 4 &&
                      regexMail.test(e.nativeEvent.text.trim()),
                  });
                }}
              />
              {data.isValidUser ? null : (
                <Animatable.View animation="bounceIn">
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Ingresa un email válido
                  </Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.action}>
              <Text style={{marginVertical: 10}}>Contraseña</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={'contraseña'}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(val) =>
                  setData({
                    ...data,
                    password: val.trim(),
                    isValidPassword: val.trim().length >= 8,
                  })
                }
              />
              {data.isValidPassword ? null : (
                <Animatable.View animation="bounceIn">
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Ingresa una contraseña válida
                  </Text>
                </Animatable.View>
              )}
            </View>

            <LinearGradientButton
              colors={['#f18263', '#ff7b7f']}
              style={styles.signIn}>
              <TouchableOpacity
                style={styles.signIn}
                delayPressIn={0}
                onPress={() => {
                  loginHandle();
                }}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: colores.blanco,
                    },
                  ]}>
                  Ingresar
                </Text>
              </TouchableOpacity>
            </LinearGradientButton>

            <TouchableOpacity
              delayPressIn={0}
              onPress={handleOnPressGoToChangePassword}>
              <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
          </CardLogin>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signUp}
              onPress={() => navigation.navigate('SignIn')}>
              <LinearGradientButton
                colors={['#FFF', '#FFF']}
                style={styles.signUp}>
                <Text
                  style={[
                    styles.textSignUp,
                    {
                      color: '#f18263',
                    },
                  ]}>
                  REGISTRARME
                </Text>
              </LinearGradientButton>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

export default connect(null)(Login);
