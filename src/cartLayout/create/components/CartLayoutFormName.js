import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../../constantes/Temas';

const CartLayoutFormName = ({
  onPressGoBack,
  onChangeName,
  projectName,
  onPressNextStep,
}) => {
  const handleGoToReview = () => {
    if (projectName) {
      onPressNextStep();
    } else {
      Alert.alert('Ingresa nombre del proyecto');
    }
  };

  return (
    <ScrollView style={style.mainContainer}>
      <TouchableOpacity style={style.header} onPress={onPressGoBack}>
        <Icon name="arrow-left" size={27} color={colores.negro} />
        <Text style={style.headerText}>Crea tu proyecto</Text>
      </TouchableOpacity>
      <View>
        <View style={{height: useWindowDimensions().height / 2}}>
          <Image
            style={style.image}
            resizeMode="contain"
            source={require('../../../assets/img/slide-4.png')}
          />
        </View>
        <View style={style.titleContainer}>
          <Text style={style.title}>¿Qué nombre tiene tu proyecto?</Text>
        </View>
        <TextInput
          style={style.input}
          onChangeText={onChangeName}
          value={projectName}
        />
        <TouchableOpacity
          style={style.nextLinkContainer}
          onPress={handleGoToReview}>
          <Text style={style.nextLink}>SIGUIENTE</Text>
          <View style={style.nextArrowContainer}>
            <Icon name="arrow-right" size={23} color={colores.logo} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
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
  headerText: {
    marginLeft: 16,
    color: 'black',
    fontWeight: '600',
    fontSize: 19,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    backgroundColor: colores.blanco,
  },
  titleContainer: {
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: colores.negro,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '60%',
    marginTop: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colores.grisLetter,
  },
  nextLinkContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  nextLink: {
    color: colores.logo,
    fontSize: 18,
  },
  nextArrowContainer: {
    marginLeft: 6,
    marginBottom: 10,
  },
});

export default CartLayoutFormName;
