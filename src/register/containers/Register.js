import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import {tamañoLetra} from '../../constantes/Temas';
import RegisterInput from '../components/RegisterInput';
import CardRegister from '../components/CardRegister';
import logo from '../../../assets/images/logo_blanco.png';
import AnimatedMessage from '../components/AnimatedMessage';
import styles from '../styles/styles';
import {getProvinces, getDiscricts} from '../../utils/apis/location_api';
import {register_api} from '../../utils/apis/login_api';
import {actualizarLogin} from '../../redux/reducer/login';
import CargandoModal from '../../generales/CargandoModal';

function Register(props) {
  const {login, dispatch, navigation} = props;
  const [loading, setloading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [provinceLocation, setProvinceLocation] = useState([]);
  const [discrictLocation, setDiscrictLocation] = useState([]);
  const [locationSelector, setLocationSelector] = useState(null);

  const [data, setData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    address: '',
    province: '',
    comuna: '',
    bornDate: '',
    districtId: '',
  });

  const [textValidator, setTextValidator] = useState({
    check_textInputChange: null,
    isValidName: null,
    isValidLastName: null,
    isValidNickName: null,
    isValidEmail: null,
    isValidPassword: null,
    isValidRepeatPassword: null,
    isValidDirection: null,
    isValidProvinceSelected: null,
    isValidComunaSelected: null,
    isValidDate: null,
  });

  const [registerValidation, setRegisterValidation] = useState(null);

  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
    const provinceData = getProvinces().then((data) =>
      setProvinceLocation(data.data),
    );
  }, []);

  useEffect(() => {
    if (locationSelector) {
      const disctrictData = getDiscricts(locationSelector).then((data) =>
        setDiscrictLocation(data.data),
      );
    }
  }, [locationSelector]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const registerHandle = async () => {
    const {
      username,
      name,
      lastname,
      email,
      password,
      address,
      comuna,
      province,
      bornDate,
      districtId,
    } = data;
    let body = {
      nickname: username.trim(),
      firstname: name.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      password: password.trim(),
      address: `${address.trim()}, ${comuna.trim()}, ${province.trim()}`,
      birthdate: bornDate.trim(),
      district_id: districtId.trim(),
    };
    for (let value in textValidator) {
      if (!textValidator[value]) {
        setRegisterValidation(false);
        return false;
      }
    }
    setRegisterValidation(true);

    if (registerValidation === true) {
      setloading(true);
      register_api(body).then((response) => {
        console.log(response);
        response.success && dispatch(actualizarLogin());
        response.errors && setError(true);
        setloading(false);
      });
    }
  };

  const textDataValidation = (value, minLength, validateKey, datakey) => {
    let validateValue = value.trim().length >= minLength ? true : false;
    setTextValidator({
      ...textValidator,
      [validateKey]: validateValue,
    });
    setData({
      ...data,
      [datakey]: value,
    });
  };

  const pickValidation = (value, key, validateKey) => {
    setData({
      ...data,
      [key]: value,
    });

    setTextValidator({
      ...textValidator,
      check_textInputChange: true,
      [validateKey]: value.length > 0 ? true : false,
    });
  };

  const handleDateChange = async (val) => {
    setShow(Platform.OS === 'ios');
    let date = new Date(val.nativeEvent.timestamp);
    let dateParse = JSON.stringify(date);
    let dateSplit = dateParse.split('T');
    dateSplit = dateSplit[0].replace(/"/g, '');
    setData((prevState) => ({
      ...data,
      bornDate: val.nativeEvent.timestamp ? dateSplit : prevState.bornDate,
    }));
    setTextValidator({
      ...textValidator,
      isValidDate:
        dateSplit.trim().length !== 0 || dateSplit.trim().length !== null
          ? true
          : false,
    });
    setShow(false);
  };

  return (
    <Container footer={false}>
      <CargandoModal title="Validando, porfavor espere..." show={loading} />
      <ScrollView>
        <StatusBar backgroundColor="#ff7b7f" barStyle="light-content" />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFAB66', '#FF8F70', '#FF8577']}
          style={styles.gradient}>
          <View>
            <View style={styles.header}>
              <Feather
                name="arrow-left"
                color={'#000'}
                style={{marginVertical: '6%', marginHorizontal: '6%'}}
                size={30}
                onPress={() => navigation.goBack()}
              />
            </View>
            <Image source={logo} alt="" style={[styles.logo, {width: '80%'}]} />
          </View>
          <CardRegister>
            <View>
              <Text
                style={[
                  styles.titleform,
                  {fontSize: tamañoLetra.subtituloContainer},
                ]}>
                Register
              </Text>
              <Text style={styles.subtitleform}>
                ¡Vamos! tan solo son unos cuantos datos que necesitamos.
              </Text>
              {registerValidation === false && (
                <AnimatedMessage message="Completar datos *" />
              )}
              <View style={styles.action}>
                <Text style={{marginVertical: 10}}>Nombre</Text>
                <TextInput
                  style={styles.registerInput}
                  autoCapitalize="none"
                  onChangeText={(val) =>
                    textDataValidation(val, 2, 'isValidName', 'name')
                  }
                />
                {textValidator.isValidName === false && (
                  <AnimatedMessage message="Ingresa un nombre valido!" />
                )}
              </View>
              <View style={styles.action}>
                <Text style={{marginVertical: 10}}>Apellido</Text>
                <TextInput
                  style={styles.registerInput}
                  onChangeText={(val) =>
                    textDataValidation(val, 2, 'isValidLastName', 'lastname')
                  }
                />
                {textValidator.isValidLastName === false && (
                  <AnimatedMessage message="Ingresa un apellido valido!" />
                )}
              </View>
              <View style={styles.action}>
                <Text style={{marginVertical: 10}}>Nickname</Text>
                <TextInput
                  style={styles.registerInput}
                  onChangeText={(val) =>
                    textDataValidation(val, 2, 'isValidNickName', 'username')
                  }
                />
                {textValidator.isValidNickName === false && (
                  <AnimatedMessage message="Ingresa un nick valido!" />
                )}
              </View>

              <View style={styles.action}>
                <Text style={{marginVertical: 10}}>Email</Text>
                <TextInput
                  style={styles.registerInput}
                  onChangeText={(val) =>
                    textDataValidation(val, 2, 'isValidEmail', 'email')
                  }
                  onEndEditing={(e) =>{
                    regexMail.test(e.nativeEvent.text.trim()) === false && setTextValidator({
                      ...textValidator,
                      isValidEmail: false,
                    })
                  }}
                />
                {textValidator.isValidEmail === false && (
                  <AnimatedMessage message="Ingresa un email valido!" />
                )}
              </View>

              <View style={styles.action}>
                <Text style={{marginVertical: 10}}>Password</Text>
                <TextInput
                  style={styles.registerInput}
                  onChangeText={(val) =>
                    textDataValidation(val, 8, 'isValidPassword', 'password')
                  }
                  secureTextEntry={true}
                />
                {textValidator.isValidPassword === false && (
                  <AnimatedMessage message="La contraseña debe tener mas de 8 caracteres" />
                )}
              </View>

              <View style={styles.action}>
                <Text style={{marginVertical: 10}}> Repetir Password</Text>
                <TextInput
                  style={styles.registerInput}
                  onChangeText={(val) =>
                    setTextValidator({
                      ...textValidator,
                      isValidRepeatPassword:
                        val === data.password ? true : false,
                    })
                  }
                  onEndEditing={(val) => console.log(val.currentTarget)}
                  secureTextEntry={true}
                />
                {textValidator.isValidRepeatPassword === false && (
                  <AnimatedMessage message="Las contraseñas no coinciden!" />
                )}
              </View>

              <View style={styles.action}>
                <Text style={{marginVertical: 10}}> Direccion</Text>
                <TextInput
                  style={styles.registerInput}
                  onChangeText={(val) =>
                    textDataValidation(val, 4, 'isValidDirection', 'address')
                  }
                />
                {textValidator.isValidDirection === false && (
                  <AnimatedMessage message="Ingresa una direccion valida!" />
                )}
              </View>

              <View style={styles.action}>
                <Text style={{marginVertical: 10}}> Provincia</Text>
                <Picker
                  selectedValue={locationSelector}
                  onValueChange={(val) => {
                    textDataValidation(
                      provinceLocation.find((province) => province.id === val)
                        .name,
                      0,
                      'isValidProvinceSelected',
                      'province',
                    );
                    setLocationSelector(val);
                    setData({...data, districtId: val});
                  }}
                  itemStyle={{height: 120}}>
                  <Picker.Item label={'- Seleccione -'} value="" />
                  {provinceLocation.map((province) => (
                    <Picker.Item
                      key={province.id}
                      label={province.name}
                      value={province.id}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.action}>
                <Text style={{marginVertical: 10}}>Comuna</Text>
                <Picker
                  selectedValue={data.comuna}
                  onValueChange={(val) =>
                    pickValidation(val, 'comuna', 'isValidComunaSelected')
                  }
                  itemStyle={{height: 120}}>
                  <Picker.Item label={'- Seleccione -'} value={false} />
                  {discrictLocation.map((district) => (
                    <Picker.Item
                      key={district.id}
                      label={district.name}
                      value={district.name}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.action}>
                <Text style={{marginVertical: 10}}> Fecha de nacimiento</Text>
                <View>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => setShow(true)}>
                    <Text style={[styles.textSign, {color: '#000'}]}>
                      {' '}
                      {data.bornDate === ''
                        ? '--Seleccione una fecha--'
                        : data.bornDate}
                    </Text>
                  </TouchableOpacity>
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display={'spinner'}
                    is24Hour={true}
                    onChange={(val) => handleDateChange(val)}
                  />
                )}
                {textValidator.isValidDate === false && (
                  <Animatable.View animation="bounceIn">
                    <Text
                      style={{
                        color: 'red',
                        textAlign: 'center',
                        marginVertical: 10,
                      }}>
                      Ingresa tu fecha de nacimiento
                    </Text>
                  </Animatable.View>
                )}
              </View>

              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  registerHandle();
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FF8577', '#FF8F70', '#FF8577']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Enviar
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </CardRegister>
        </LinearGradient>
      </ScrollView>
    </Container>
  );
}

const mapStateToProps = (state) => ({register: state.register});
export default connect(mapStateToProps)(Register);
