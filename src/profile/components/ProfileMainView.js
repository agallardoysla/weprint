import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {tipoDeLetra, colores} from '../../constantes/Temas';
import GeneralImage from '../../generales/GeneralImage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ProfileMainView = ({data, navigation, loading}) => {
  const {nickname, district_name, country_name, avatar, birthdate} = data;

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <LinearGradient
      colors={['#ffaa66', '#ff7584']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style.mainContainer}>
      {loading ? (
        <Text style={{color: colores.blanco}}>Cargando...</Text>
      ) : (
        <>
          <GeneralImage uri={avatar} styleImg={style.image} />
          <Text style={style.nick}>{nickname}</Text>
          <View style={style.infoContainer}>
            <View style={style.infoItem}>
              <Icon name="calendar" size={18} color={colores.blanco} />
              <Text style={style.infoText}>Edad: {getAge(birthdate)} Años</Text>
            </View>
            <View style={style.infoItem}>
              <Icon name="location-arrow" size={18} color={colores.blanco} />
              <Text style={style.infoText}>
                {`${district_name}, ${country_name}`}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            delayPressIn={0}
            style={style.button}
            onPress={() => navigation.navigate('EditProfile', data)}>
            <Text style={style.buttonTitle}>EDITAR PERFIL</Text>
          </TouchableOpacity>
        </>
      )}
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '40%',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: colores.blanco,
    borderWidth: 2.5,
  },
  nick: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
    color: colores.blanco,
    fontSize: RFPercentage(3),
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  infoItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoText: {
    marginLeft: 10,
    color: colores.blanco,
    fontFamily: tipoDeLetra.bold,
    fontSize: 15,
  },
  button: {
    paddingHorizontal: 35,
    borderRadius: 30,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: colores.blanco,
  },

  buttonTitle: {
    color: '#f18263',
    fontWeight: 'bold',
    fontFamily: tipoDeLetra.bold,
    fontSize: 13,
  },
});

ProfileMainView.defaultProps = {
  name: 'gaston',
  address: 'Iquique, Chile',
  photo:
    'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg',
  age: '20',
};
