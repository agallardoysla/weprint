/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, StatusBar, Platform, ImageBackground, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { SvgUri } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

//importaciones necesarias para redux
import { connect } from 'react-redux';
import { actions } from '../../redux';
import Container from '../../generales/Container';
import { tamañoLetra } from '../../constantes/Temas'


// components
import RegisterInput from '../components/RegisterInput';
import CardRegister from '../components/CardRegister';
import LayoutInput from '../components/LayoutInput';
import backgroundRegister from '../../../assets/images/android/splash/drawable-port-xxhdpi-screen.png';
import backgroundLogin from '../../../assets/images/login.png';
import logo from '../../../assets/images/logo_blanco.png';

// styles
import styles from '../styles/styles'



function Register(props) {
  const { login, dispatch, navigation } = props;
  const [loading, setloading] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = React.useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
    province: '',
    comuna: '',
    bornDate: '',
    check_textInputChange: true,
    isValidName: true,
    isValidLastName: true,
    isValidNickName: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidRepeatPassword: true,
    isValidDirection: true,
    isValidProvinceSelected: true,
    isValidComunaSelected: true,
    isValidDate: true,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });



  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = async () => {
    showMode('date');
  }




  const textInputName = (val) => {
    console.log('val', val)
    if (val.trim().length >= 2) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidName: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidName: false
      });
    }
  }

  const textInputLastNameChange = (val) => {
    console.log('val', val)
    if (val.trim().length >= 2) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidLastName: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidLastName: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const textInputNickChange = (val) => {
    console.log('val', val)
    if (val.trim().length >= 2) {
      setData({
        ...data,
        isValidNickName: true
      });
    } else {
      setData({
        ...data,
        isValidNickName: false
      });
    }
  }

  const textInputEmailChange = (val) => {
    console.log('val', val)
    if (val.trim().length >= 2) {
      setData({
        ...data,
        isValidEmail: true
      });
    } else {
      setData({
        ...data,
        isValidEmail: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    console.log('val', val)
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

  const handlePasswordRepeatChange = (val) => {
    console.log('val', val)
    if (val.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: val,
        isValidRepeatPassword: true
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidRepeatPassword: false
      });
    }
  }

  const handleDirectionChange = (val) => {
    console.log('val', val)
    if (val.trim().length >= 4) {
      setData({
        ...data,
        address: val,
        isValidDirection: true
      });
    } else {
      setData({
        ...data,
        address: val,
        isValidDirection: false
      });
    }
  }


  const handleDateChange = async (val) => {
    console.log('val date', val.nativeEvent.timestamp)
    let date = new Date(val.nativeEvent.timestamp)
    let dateParse = JSON.stringify(date)
    let dateSplit = dateParse.split('T')
    dateSplit = dateSplit[0].replace(/"/g, "")
    console.log(dateSplit)

    if (dateSplit.trim().length !== 0 || dateSplit.trim().length !== null) {
      setData({
        ...data,
        bornDate: dateSplit,
        isValidDate: true
      });
      setShow(false);
    } else if (val.nativeEvent.timestamp === null) {
      setData({
        ...data,
        bornDate: '--Seleccione una fecha--',
        check_textInputChange: true,
        isValidDate: false
      });
      setShow(false);
    } else {
      setData({
        ...data,
        bornDate: dateSplit,
        check_textInputChange: true,
        isValidDate: false
      });
    }
  }

  const handleSelectProvinceChange = (val) => {
    console.log('val', val)
    setData({
      ...data,
      province: val,
      check_textInputChange: true,
      isValidProvinceSelected: true
    });
  }

  const handleSelectComunaChange = (val) => {
    console.log('val', val)
    setData({
      ...data,
      comuna: val,
      check_textInputChange: true,
      isValidComunaSelected: true
    });
  }


  const registerHandleHandle = () => {
    console.log('data', data)
  }

  return (


    <ScrollView>
      <StatusBar backgroundColor='#ff7b7f' barStyle="light-content" />
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFAB66', '#FF8F70', '#FF8577']} style={styles.gradient}>
        <View>
          <View style={styles.header}>
            <Feather
              name="arrow-left"
              color={'#000'}
              style={{ marginVertical: '6%', marginHorizontal: '6%' }}
              size={30}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Image source={logo} alt='' style={[styles.logo, { width: '80%' }]} />
        </View>
        <CardRegister>
          <View>

            <Text style={[styles.titleform, { fontSize: tamañoLetra.subtituloContainer }]}>Register</Text>
            <Text style={styles.subtitleform}>¡Vamos! tan solo son unos cuantos datos que necesitamos.</Text>



            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Nombre</Text>
              <TextInput
                style={styles.registerInput}
                placeholder={'Nombre'}
                autoCapitalize="none"
                onChangeText={(val) => textInputName(val)}
              />
              {data.isValidName ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa un nombre valido!</Text>
                </Animatable.View>
              }
            </View>



            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Apellido</Text>
              <TextInput
                style={styles.registerInput}
                placeholder={'Apellido'}
                onChangeText={(val) => textInputLastNameChange(val)}
              />
              {data.isValidLastName ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa un apellido valido!</Text>
                </Animatable.View>
              }
            </View>



            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Nickname</Text>
              <TextInput
                style={styles.registerInput}
                placeholder={'Nickname'}
                onChangeText={(val) => textInputNickChange(val)}
              />
              {data.isValidNickName ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa un nick valido!</Text>
                </Animatable.View>
              }
            </View>


            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Email</Text>
              <TextInput
                style={styles.registerInput}
                placeholder={'Email'}
                onChangeText={(val) => textInputEmailChange(val)}
              />
              {data.isValidEmail ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa un email valido!</Text>
                </Animatable.View>
              }
            </View>

            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Password</Text>
              <TextInput
                style={styles.registerInput}
                placeholder={'Password'}
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
                  }}>Ingresa un password valido!</Text>
                </Animatable.View>
              }
            </View>

            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}> Repetir Password</Text>
              <TextInput
                style={styles.registerInput}
                placeholder={'Repetir Password'}
                onChangeText={(val) => handlePasswordRepeatChange(val)}
              />
              {data.isValidRepeatPassword ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa un password valido!</Text>
                </Animatable.View>
              }
              {data.confirm_password !== data.password ? 
              (<Animatable.View
                animation="bounceIn"
              >
                <Text style={{
                  color: 'red',
                  textAlign: 'center',
                  marginVertical: 10
                }}>Ambos password deben ser iguales</Text>
              </Animatable.View> )
                : null
                
              }
            </View>


            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}> Direccion</Text>
              <TextInput
                style={styles.registerInput}
                placeholder={'Direccion'}
                onChangeText={(val) => handleDirectionChange(val)}
              />
              {data.isValidDirection ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa una direccion valida</Text>
                </Animatable.View>
              }
            </View>

            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}> Provincia</Text>
              <Picker
                selectedValue={data.province}
                onValueChange={val => handleSelectProvinceChange(val)}
                itemStyle={{ height: 120 }}
              >
                <Picker.Item label={'- Seleccione -'} value='' />
                <Picker.Item label={'Bío Bío'} value='Bío Bío' />
              </Picker>

            </View>

            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}>Comuna</Text>
              <Picker
                selectedValue={data.comuna}
                onValueChange={val => handleSelectComunaChange(val)}
                itemStyle={{ height: 120 }}
              >
                <Picker.Item label={'- Seleccione -'} value={false} />
                <Picker.Item label={'Cabrero'} value='Cabrero' />


              </Picker>
            </View>


            <View style={styles.action}>
              <Text style={{ marginVertical: 10 }}> Fecha de nacimiento</Text>
              <View>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={showDatepicker}
                >
                  <Text style={[styles.textSign, { color: '#000' }]}> {data.bornDate === '' ? '--Seleccione una fecha--' : data.bornDate}</Text>
                </TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display={'spinner'}
                  is24Hour={true}
                  onChange={(val) => handleDateChange(val)}
                />
              )}
              {data.isValidDate ? null :
                <Animatable.View
                  animation="bounceIn"
                >
                  <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginVertical: 10
                  }}>Ingresa una fecha!</Text>
                </Animatable.View>
              }
            </View>


            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { registerHandle() }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FF8577', '#FF8F70', '#FF8577']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Enviar</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </CardRegister>
      </LinearGradient>

    </ScrollView>

  );
}


const mapStateToProps = (state) => ({ register: state.register });
export default connect(mapStateToProps)(Register);
