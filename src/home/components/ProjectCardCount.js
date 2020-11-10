import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../constantes/Temas';

const ProjectCardCount = ({cartsAmount}) => {
  return (
    <View style={style.mainContainer}>
      <View style={style.imageContainer}>
        <Image
          style={style.image}
          source={{
            uri:
              'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg',
          }}
        />
      </View>
      <View style={style.infoMainContainer}>
        <View style={style.textMainContainer}>
          <View style={style.textContainer}>
            <Text style={style.title}>Mis Proyectos</Text>
          </View>
          <View style={style.textContainer}>
            <Text style={style.secondTitle}>
              En estos momentos: {cartsAmount}
            </Text>
          </View>
        </View>
        <View>
          <Icon
            name="chevron-right"
            size={24}
            color={colores.grisFormatoAlbum}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  imageContainer: {
    width: 44,
    height: 44,
    marginTop: 1,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },

  textContainer: {
    marginVertical: 1,
  },
  infoMainContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    paddingBottom: 11,
    borderBottomWidth: 0.5,
    borderBottomColor: colores.gris,
  },
  title: {
    color: colores.negro,
    fontSize: 16,
  },
  secondTitle: {
    color: colores.negro,
    fontSize: 14,
  },
});

export default ProjectCardCount;
