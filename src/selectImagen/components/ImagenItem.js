import React, {useState} from 'react';
import {Image, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../constantes/Temas';

const ImagenItem = ({uri}) => {
  const [isCheck, setIsCheck] = useState(false);

  const handleIsCheck = () => setIsCheck(!isCheck);

  return (
    <TouchableWithoutFeedback onPress={handleIsCheck}>
      <View style={style.imagenItemMainContainer}>
        <>
          <Image source={{uri}} style={style.imagenItem} resizeMode="cover" />
          {isCheck && (
            <View style={style.imagenItemCheckContainer}>
              <Icon name="check" size={27} color={colores.blanco} />
            </View>
          )}
        </>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  imagenItemMainContainer: {
    position: 'relative',
    marginHorizontal: 5,
    maxWidth: 768,
  },
  imagenItemCheckContainer: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colores.logo,
    lineHeight: 15,
  },
  imagenItem: {
    height: 130,
    minWidth: 130,
    width: '100%',
  },
});

export default ImagenItem;
