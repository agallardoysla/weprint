import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import GeneralImage from '../../generales/GeneralImage';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colores} from '../../constantes/Temas';

const ProjectCardView = ({project, onPressGoToFormat}) => {
  const handleOnPress = () => onPressGoToFormat(project.id);

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={style.projectCardContainer}>
      <GeneralImage uri={project.image} styleImg={style.projectCardImage} />
      <View style={style.projectCardOverlay}>
        <Text style={style.projectCardOverlayText}>{project.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  projectCardContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  projectCardImage: {
    height: '100%',
    width: '100%',
  },
  projectCardOverlay: {
    position: 'absolute',
    width: '100%',
    height: 60,
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  projectCardOverlayText: {
    color: colores.blanco,
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default ProjectCardView;
