import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {tipoDeLetra, colores} from '../constantes/Temas';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const MenuItem = ({
  name,
  nameStyle,
  icon,
  color,
  background,
  onPressFunction,
  divider = true,
  photo,
  text,
  textStyle,
}) => {
  console.log(photo);
  return (
    <TouchableOpacity
      style={{backgroundColor: background ? background : colores.blanco}}
      onPress={onPressFunction}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        {photo ? (
          <Image
            source={{uri: `${photo}`}}
            style={{height: 45, width: 45, marginRight: 15, borderRadius: 100}}
          />
        ) : (icon ? (
          <Icon name={icon} style={{marginRight: 15}} color={color} size={20} />
        ) : null)
        }
        <View>
          <Text style={StyleSheet.flatten([styles.title,nameStyle])}>{name}</Text>
          {text && <Text style={StyleSheet.flatten([textStyle])}>{text}</Text>}
        </View>
        <Icon
          name="keyboard-arrow-right"
          style={{marginLeft: 'auto'}}
          color={colores.gris}
          size={25}
        />
      </View>
      {divider && (
        <View
          style={{
            height: 0.5,
            marginVertical: 5,
            backgroundColor: colores.gris,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(2),
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
    color: colores.gris,
  },
});
