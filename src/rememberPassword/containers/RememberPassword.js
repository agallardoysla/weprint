import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Logo from '../../assets/img/logo.svg';
import Icon from 'react-native-vector-icons/dist/Feather';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import {colores, tamañoLetra, tipoDeLetra} from '../../constantes/Temas';
import {remember_password_api} from '../../utils/apis/login_api';

const REGEX_MAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function RememberPassword({dispatch, navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  const handleOnPressGoToBack = () => navigation.goBack();

  const handleChangeEmail = (text) => setEmail(text.trim());

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await remember_password_api({email});

      if (response.errors) {
        Alert.alert('No se pudo enviar email, intenta de nuevo');
      }

      if (response.success) {
        Alert.alert('Se envio email correctamente, revisa tu bandeja');
        navigation.navigate('ChangePassword');
      }

      setLoading(false);
    } catch {
      setLoading(false);
      Alert.alert('No se pudo enviar email, intenta de nuevo');
    }
  };

  const handleValidation = () => {
    if (!email) {
      Alert.alert('Ingresa email');
    } else if (!REGEX_MAIL.test(email)) {
      Alert.alert('Ingresa formato correcto de email');
    } else {
      handleSubmit();
    }
  };

  return (
    <View>
      <TouchableOpacity style={style.header} onPress={handleOnPressGoToBack}>
        <View style={style.iconContainer}>
          <Icon name="arrow-left" size={33} color={colores.negro} />
        </View>
        <View>
          <Logo height={style.logo.height} width={style.logo.width} />
        </View>
      </TouchableOpacity>
      <View style={style.container}>
        <View style={style.card}>
          <View style={style.cardContent}>
            <View style={style.titleContainer}>
              <Text style={style.titleform}>Recuperar Contraseña</Text>
            </View>
            <View style={style.inputContainer}>
              <TextInput
                placeholder="Ingresa email"
                style={style.input}
                onChangeText={handleChangeEmail}
                value={email}
              />
            </View>
            <View style={style.buttonContainer}>
              <TouchableOpacity
                style={{...style.button, opacity: loading ? 0.5 : 1}}
                disabled={loading}
                onPress={handleValidation}>
                {loading ? (
                  <ActivityIndicator color={colores.blanco} size={26} />
                ) : (
                  <Text style={style.buttonText}>Enviar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    position: 'relative',
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
  },
  logo: {
    width: 80,
    height: 80,
    paddingRight: 2,
  },
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 10,
    width: '100%',
    marginHorizontal: 3,
    marginVertical: 6,

    backgroundColor: colores.blanco,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
  titleContainer: {
    marginBottom: 10,
  },
  titleform: {
    fontSize: tamañoLetra.subtituloContainer,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: colores.grisClaro,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    color: colores.loginInput,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    width: '80%',
    marginHorizontal: '20%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 290486,
    backgroundColor: colores.logo,
  },
  buttonText: {
    color: colores.blanco,
    fontFamily: tipoDeLetra.regular,
    fontSize: 20,
  },
});

export default connect(null)(RememberPassword);
