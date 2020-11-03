import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../../constantes/Temas';

const AlbumIconItem = ({
  storage,
  title,
  storageName,
  iconName,
  onPressStorage,
}) => {
  const handleOnPress = () => onPressStorage(storageName);

  const getColor = () =>
    storageName === storage ? colores.logo : colores.menuSelect;

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={style.iconItem}>
        <Icon name={iconName} size={25} color={getColor()} />
        <Text
          style={{
            ...style.iconText,
            color: getColor(),
          }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  iconItem: {
    padding: 20,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AlbumIconItem;
