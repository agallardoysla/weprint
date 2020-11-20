import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {useTranslation} from 'react-i18next';
import {tamañoLetra, colores} from '../../constantes/Temas';
import CardRegister from '../components/CardRegister';
import logo from '../../../assets/images/logo_blanco.png';
import AnimatedMessage from '../components/AnimatedMessage';
import styles from '../styles/styles';
import {getProvinces, getDiscricts} from '../../utils/apis/location_api';
import {register_api, login_api} from '../../utils/apis/login_api';
import {actualizarLogin} from '../../redux/reducer/login';
import CargandoModal from '../../generales/CargandoModal';
import Cargando from '../../generales/Cargando';

function Register({dispatch, navigation}) {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loadingProvince, setLoadingProvince] = useState(true);
  const [errorProvince, setErrorProvince] = useState(false);
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

  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const loadProvinces = useCallback(async () => {
    setLoadingProvince(true);
    try {
      const response = await getProvinces();
      setProvinceLocation(response.data);
      setLoadingProvince(false);
    } catch {
      setLoadingProvince(false);
      setErrorProvince(true);
    }
    setLoadingProvince(false);
  }, []);

  const loadDistricts = useCallback(async () => {
    setDiscrictLocation([]);

    try {
      const response = await getDiscricts(locationSelector);

      setDiscrictLocation(response.data);
    } catch {
      Alert.alert('No se pudo cargar comunas, revisa tu conexión');
    }
  }, [locationSelector]);

  const handleLogin = async (email, password) => {
    const loginData = {email, password};
    const loginResponse = await login_api(loginData);

    if (loginResponse.success) {
      dispatch(actualizarLogin());
    } else if (loginResponse.errors) {
      Alert.alert(
        'Su cuenta fue registrada pero no pudo loguearse, por favor intente desde la pantalla de login',
      );
      setLoading(false);
    }
  };

  const handleServerError = ({code_err, message}) => {
    if (code_err === 302 && message) {
      const translateFormat = message.replace(/\s/g, '_').toUpperCase();

      Alert.alert(t(translateFormat));
    } else {
      Alert.alert('Ha ocurrido un error vuelve a intentarlo');
    }
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
      district_id: districtId,
    };

    for (let value in textValidator) {
      if (!textValidator[value]) {
        setRegisterValidation(false);
        return false;
      }
    }

    setRegisterValidation(true);
    setLoading(true);
    try {
      const registerResponse = await register_api(body);

      if (registerResponse.errors) {
        handleServerError(registerResponse.errors);
        setLoading(false);
      } else if (registerResponse.success) {
        handleLogin(body.email, body.password);
      }
    } catch {
      Alert.alert('Ha ocurrido un error vuelve a intentarlo');
      setLoading(false);
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

  const pickValidation = (value, validateKey) => {
    setTextValidator({
      ...textValidator,
      check_textInputChange: true,
      [validateKey]: value.length > 0 ? true : false,
    });
  };

  const handleDateChange = async (evt) => {
    setShow(Platform.OS === 'ios');
    let dateUpdated = new Date(evt.nativeEvent.timestamp);
    let dateParse = JSON.stringify(dateUpdated);
    let dateSplit = dateParse.split('T');
    dateSplit = dateSplit[0].replace(/"/g, '');

    setData((prevState) => ({
      ...data,
      bornDate: evt.nativeEvent.timestamp ? dateSplit : prevState.bornDate,
    }));

    setTextValidator({
      ...textValidator,
      isValidDate:
        dateSplit.trim().length !== 0 || dateSplit.trim().length !== null
          ? true
          : false,
    });
    setShow(false);
    setDate(new Date(evt.nativeEvent.timestamp));
  };

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
    loadProvinces();
  }, [dispatch, navigation, loadProvinces]);

  useEffect(() => {
    if (locationSelector) {
      loadDistricts();
    }
  }, [locationSelector, loadDistricts]);

  return (
    <>
      <CargandoModal title="Validando, por favor espere..." show={loading} />
      <ScrollView>
        <StatusBar backgroundColor="#ff7b7f" barStyle="light-content" />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFAB66', '#FF8F70', '#FF8577']}
          style={styles.gradient}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather
                name="arrow-left"
                color={colores.blanco}
                style={{marginVertical: '6%', marginHorizontal: '5%'}}
                size={32}
              />
            </TouchableOpacity>
            <Image source={logo} style={[styles.logo, {width: '80%'}]} />
          </View>
          {provinceLocation.length > 0 && (
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
                    onChangeText={(val) =>
                      textDataValidation(val, 2, 'isValidName', 'name')
                    }
                  />
                  {textValidator.isValidName === false && (
                    <AnimatedMessage message="Ingresa un nombre válido!" />
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
                    <AnimatedMessage message="Ingresa un apellido válido!" />
                  )}
                </View>
                <View style={styles.action}>
                  <Text style={{marginVertical: 10}}>Nickname</Text>
                  <TextInput
                    style={styles.registerInput}
                    autoCapitalize="none"
                    onChangeText={(val) =>
                      textDataValidation(val, 2, 'isValidNickName', 'username')
                    }
                  />
                  {textValidator.isValidNickName === false && (
                    <AnimatedMessage message="Ingresa un nick válido!" />
                  )}
                </View>

                <View style={styles.action}>
                  <Text style={{marginVertical: 10}}>Email</Text>
                  <TextInput
                    style={styles.registerInput}
                    autoCapitalize="none"
                    onChangeText={(val) =>
                      textDataValidation(val, 2, 'isValidEmail', 'email')
                    }
                    onEndEditing={(e) => {
                      regexMail.test(e.nativeEvent.text.trim()) === false &&
                        setTextValidator({
                          ...textValidator,
                          isValidEmail: false,
                        });
                    }}
                  />
                  {textValidator.isValidEmail === false && (
                    <AnimatedMessage message="Ingresa un email válido!" />
                  )}
                </View>

                <View style={styles.action}>
                  <Text style={{marginVertical: 10}}>Contraseña</Text>
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
                  <Text style={{marginVertical: 10}}> Repetir Contraseña</Text>
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
                  <Text style={{marginVertical: 10}}> Dirección</Text>
                  <TextInput
                    style={styles.registerInput}
                    onChangeText={(val) =>
                      textDataValidation(val, 4, 'isValidDirection', 'address')
                    }
                  />
                  {textValidator.isValidDirection === false && (
                    <AnimatedMessage message="Ingresa una dirección válida!" />
                  )}
                </View>

                <View style={styles.action}>
                  <Text style={{marginVertical: 10}}> Provincia</Text>
                  <Picker
                    selectedValue={locationSelector}
                    onValueChange={(val) => {
                      const selectedProvince = provinceLocation.find(
                        (province) => province.id === val,
                      );

                      setTextValidator({
                        ...textValidator,
                        isValidComunaSelected: false,
                        isValidProvinceSelected: selectedProvince.name
                          ? true
                          : false,
                      });

                      setLocationSelector(val);
                      setData({
                        ...data,
                        comuna: '',
                        districtId: '',
                        province: selectedProvince.name,
                      });
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
                    selectedValue={data.districtId}
                    onValueChange={(districtId) => {
                      const selectedDistrict = discrictLocation.find(
                        (district) => district.id === districtId,
                      );

                      pickValidation(
                        selectedDistrict.name,
                        'isValidComunaSelected',
                      );

                      setData({
                        ...data,
                        comuna: selectedDistrict.name,
                        districtId,
                      });
                    }}
                    itemStyle={{height: 120}}>
                    <Picker.Item label={'- Seleccione -'} value={false} />
                    {discrictLocation.map((district) => (
                      <Picker.Item
                        key={district.id}
                        label={district.name}
                        value={district.id}
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
                      <Text style={[styles.textSign, {color: colores.negro}]}>
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
                          color: colores.blanco,
                        },
                      ]}>
                      Enviar
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </CardRegister>
          )}
          {loadingProvince && (
            <View
              style={{
                width: '100%',
                height: Dimensions.get('window').height - 146,
              }}>
              <Cargando
                loaderColor={colores.blanco}
                titulo="Cargando"
                tituloStyle={{color: colores.blanco, paddingBottom: 10}}
              />
            </View>
          )}
          {errorProvince && (
            <View
              style={{
                width: '100%',
                height: Dimensions.get('window').height - 146,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={loadProvinces}
                style={{
                  backgroundColor: colores.blanco,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                }}>
                <Text style={{color: colores.logo}}>Volver a cargar</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </>
  );
}

export default connect(null)(Register);
