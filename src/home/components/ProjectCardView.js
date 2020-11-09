import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import GeneralImage from '../../generales/GeneralImage';
import {colores, tipoDeLetra} from '../../constantes/Temas';

const ProjectCardView = ({project, onPressGoToFormat}) => {
  const handleOnPress = () => onPressGoToFormat(project.id);

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{
        ...style.projectCardContainer,
        width: useWindowDimensions().width - 20,
      }}>
      <GeneralImage uri={project.image} styleImg={style.projectCardImage} />
      <View style={style.projectCardOverlay}>
        <Text style={style.projectCardOverlayText}>
          {project.name.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  projectCardContainer: {
    position: 'relative',
    height: 300,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  projectCardImage: {
    height: '100%',
    width: '100%',
  },
  projectCardOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  projectCardOverlayText: {
    marginLeft: 16,
    color: colores.blanco,
    fontSize: 20,
    fontFamily: tipoDeLetra.regular,
  },
});

export default ProjectCardView;
