import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colores} from '../../../constantes/Temas';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ImageRepository = ({
  imageLink,
  onPressFunction,
  base64 = true,
  deleteView,
  imageWidth
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  
  console.log(imageWidth / 3 - 20 )

  return (
    <TouchableWithoutFeedback
      disabled={deleteView === false ? true : false}
      onPress={() => setDeleteModal(!deleteModal)}>
      <Image
        resizeMode="cover"
        style={{
          width: imageWidth / 3 - 20,
          height: imageWidth / 3 - 20,
          alignSelf: 'center',
          borderColor: colores.blanco,
          margin: 5,
        }}
        source={{
          uri:
            base64 === true ? `data:image/jpeg;base64,${imageLink}` : imageLink,
        }}
      />
      {deleteModal === true && (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: colores.grisTransparente,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingHorizontal: '20%',
              paddingVertical: '20%',
              borderRadius: 100,
              backgroundColor: colores.blanco,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Icon
              name="trash"
              size={40}
              color={colores.gris}
              onPress={onPressFunction}
              style={{position: 'absolute'}}
            />
          </View>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

