import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Cargando from './Cargando';
import {connect} from 'react-redux';
import {colores, estiloDeLetra} from '../constantes/Temas'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useRoute} from '@react-navigation/native';

function Container({
  children,
  isloading = false,
  navigation,
  footer = true,
  loadingProps,
}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, width: '100%'}}>{children}</View>
      
      {footer && <Footer navigation={navigation.navigation} />}
      {isloading && (
        <Cargando
          {...loadingProps}
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(52,52,52,0.5)',
            height: '100%',
          }}
        />
      )}
    </View>
  );
}

const Footer = ({navigation}) => {
  const route = useRoute();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
      <Item navigation={navigation} ruta={'Home'} title={'Home'} iconName={'home'} isRoute={route} />
      <Item navigation={navigation} ruta={'Cart'} title={'Cesta'} iconName={'shopping-cart'} isRoute={route} />
      <Item navigation={navigation} ruta={'Profile'} title={'Perfil'} iconName={'user-alt'} isRoute={route} />
    </View>
  );
};

const Item = ({navigation, ruta, title, iconName, isRoute}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ruta);
      }}
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: 125,
        flexGrow: 0,
        borderRadius: 25,
      }}>
      <Icon
        name={iconName}
        color={isRoute.name !== ruta ?  colores.menuSelect : colores.naranja}
        size={20}
        style={{margin: 3}}
      />
      <Text style={{...estiloDeLetra.negrita, color: isRoute.name !== ruta ?  colores.menuSelect : colores.naranja}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
});
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Container);
