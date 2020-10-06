import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradientButton from 'react-native-linear-gradient';
import {connect, useDispatch, useSelector} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import {tamañoLetra, colores} from '../../constantes/Temas';
import CardLogin from '../components/CardLogin';
import logo from '../../../assets/images/logo_blanco.png';
import Background from '../../../assets/images/svg/login.svg';
import styles from '../styles/styles';
import {actualizarLogin} from '../../redux/reducer/login';
import {login_api} from '../../utils/apis/login_api';
import CargandoModal from '../../generales/CargandoModal'

function Login(props) {
  const {login, dispatch, navigation} = props;
  const [loading, setloading] = useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  const loginHandle = async () => {
    let body = {
      email: data.email,
      password: data.password,
    };

    if (data.isValidPassword && data.isValidUser) {
      setloading(true)
      login_api(body).then((response) => {
        console.log(response);
        response.success && dispatch(actualizarLogin());
        response.errors && setError(true);
        setloading(false)
      });
    }
  };
  console.log(login);

  return (
    <Container footer={false}>
      <CargandoModal title="Validando, porfavor espere..." show={loading} /> 
      <ScrollView>
        <StatusBar backgroundColor={colores.grisClaro} barStyle="light-content" />
        <View style={{height: 30, width: '100%'}}>
          <Background width={'100%'} height={95} />
        </View>
        <Image source={logo} alt="" style={[styles.logo, {width: '80%'}]} />
        <View>
          <CardLogin>
            <Text style={styles.titleform}>Login</Text>
            <Text style={styles.subtitleform}>
              Ingresa a tu email y contraseña para acceder a la aplicación
            </Text>
            {error === true && !login && <Text>* Email y/o password es incorrecto</Text>}
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
                    isValidUser: val.trim().length >= 4 ? true : false,
                  })
                }
                onEndEditing={(e) =>
                  setData({
                    ...data,
                    isValidUser:
                      e.nativeEvent.text.trim().length >= 4 ? true : false,
                  })
                }
              />
              {data.isValidUser ? null : (
                <Animatable.View animation="bounceIn">
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Ingresa un email valido
                  </Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.action}>
              <Text style={{marginVertical: 10}}>Password</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={'Password'}
                autoCapitalize="none"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(val) =>
                  setData({
                    ...data,
                    password: val.trim(),
                    isValidPassword: val.trim().length >= 8 ? true : false,
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
                    Ingresa un password valido
                  </Text>
                </Animatable.View>
              )}
            </View>

            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle();
              }}>
              <LinearGradientButton
                colors={['#f18263', '#ff7b7f']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Ingresar
                </Text>
              </LinearGradientButton>
            </TouchableOpacity>

            <TouchableOpacity>
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

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(Login);
