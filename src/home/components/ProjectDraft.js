import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {colores} from '../../constantes/Temas';

const ProjectDraft = ({cart, onPressGoToDetail}) => {
  const handleOnPress = () => onPressGoToDetail(cart);

  return (
    <TouchableOpacity style={style.mainContainer} onPress={handleOnPress}>
      <View
        style={{...style.imageContainer, width: useWindowDimensions().width}}>
        <Image
          style={style.image}
          source={{
            uri: cart.pages[0].pieces[0].file,
          }}
          resizeMode="cover"
        />
        <View style={style.overlay} />
      </View>
      <View style={style.letterContainer}>
        <View>
          <Text style={style.title}>{cart.name}</Text>
        </View>
        <View>
          <Text style={style.description}>{cart.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    marginRight: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  imageContainer: {
    position: 'relative',
    height: 135,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
  },
  title: {
    color: colores.blanco,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colores.blanco,
    fontSize: 14,
  },
  letterContainer: {
    position: 'absolute',
    top: 8,
    left: 10,
  },
});

export default ProjectDraft;
