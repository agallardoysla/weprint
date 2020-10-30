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
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <TouchableWithoutFeedback
      disabled={deleteView === false ? true : false}
      onPress={() => setDeleteModal(!deleteModal)}>
      <Image
        resizeMode="cover"
        style={styles.image}
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
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 100,
              backgroundColor: colores.blanco,
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

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderColor: colores.blanco,
    margin: 5,
  },
});
