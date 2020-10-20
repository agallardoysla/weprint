import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Container from '../../generales/Container';
import {colores, estiloDeLetra} from '../../constantes/Temas';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectionListImage from '../../generales/SelectionListImage';
import {ImageRepository} from './components/ImageRepository';
import {upload_image} from '../../utils/apis/project_api';
import CargandoModal from '../../generales/CargandoModal';

function RepositoryDescription({route}) {
  const [images, setImages] = useState(null);
  const [sendImages, setSendImages] = useState(false);
  const [showListImage, setShowListImage] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(route)

  const handleDeleteImage = (index) => {
    const newImageArray = images;
    Alert.alert(
      'Borrar Imagen',
      'Deseas eliminar esta imagen de tu repositorio ?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            setImages(newImageArray.filter((val, idx) => idx !== index));
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (images && images.length === 0) {
      setSendImages(false);
      setImages(null);
    }
  }, [images]);

  const handleUploadToRepository = () => {
    const uri = images[0].uri;
    //folder: "user",
    //repository: route.params.repoName

    console.log(images)
  };

  return (
    <Container footer={false}>
      <View style={{backgroundColor: colores.fondoScreen, height: '100%'}}>
        {sendImages === false ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <TouchableOpacity onPress={() => setShowListImage(true)}>
              <View
                style={{
                  padding: 20,
                  backgroundColor: colores.button,
                  width: 190,
                  borderRadius: 50,
                  margin: 5,
                }}>
                <Text
                  style={{
                    ...estiloDeLetra.negrita,
                    color: colores.blanco,
                    textAlign: 'center',
                    fontSize: RFPercentage(1.5),
                  }}>
                  CARGAR FOTOS
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  padding: 20,
                  backgroundColor: colores.button,
                  width: 190,
                  borderRadius: 50,
                  margin: 5,
                }}>
                <Text
                  style={{
                    ...estiloDeLetra.negrita,
                    color: colores.blanco,
                    textAlign: 'center',
                    fontSize: RFPercentage(1.5),
                  }}>
                  COMPARTIR
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <TouchableOpacity onPress={handleUploadToRepository}>
              <View
                style={{
                  padding: 20,
                  backgroundColor: colores.button,
                  width: 190,
                  borderRadius: 50,
                  margin: 5,
                }}>
                <Text
                  style={{
                    ...estiloDeLetra.negrita,
                    color: colores.blanco,
                    textAlign: 'center',
                    fontSize: RFPercentage(1.5),
                  }}>
                  ACEPTAR
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}>
            {images &&
              images.map((image, index) => (
                <ImageRepository
                  key={index}
                  imageLink={image.base64}
                  onPressFunction={() => handleDeleteImage(index)}
                />
              ))}
          </View>
        </ScrollView>
        <Modal
          visible={showListImage}
          hardwareAccelerated={true}
          animationType="slide">
          <SelectionListImage
            minQuantity={1}
            onResponse={(images) => {
              setShowListImage(false);
              setImages(images);
              setSendImages(true);
            }}
            onPressGoToBack={() => setShowListImage(false)}
          />
        </Modal>
      </View>
      <CargandoModal title="Cargando" show={loading} />
    </Container>
  );
}

export default RepositoryDescription;
