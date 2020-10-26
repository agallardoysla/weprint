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
import {get_pieces_from_repository} from '../../utils/apis/repository_api';
import navigation from '../../redux/reducer/navigation';

function RepositoryDescription({route, navigation}) {
  const [imagesFromRepo, setImagesFromRepo] = useState(null);
  const [imagesToSend, setImagesToSend] = useState(null);
  const [sendImages, setSendImages] = useState(false);
  const [showListImage, setShowListImage] = useState(false);
  const [loading, setLoading] = useState(route.params.repoId ? true : false);

  console.log(route)

  const handleDeleteImage = (index) => {
    const newImageArray = imagesToSend;
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
            setImagesToSend(newImageArray.filter((val, idx) => idx !== index));
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (imagesToSend && imagesToSend.length === 0) {
      setSendImages(false);
      setImagesToSend(null);
    }
  }, [imagesToSend]);

  useEffect(() => {
    route.params.repoId &&
      get_pieces_from_repository(route.params.repoId).then((data) => {
        setImagesFromRepo(data.data);
        setLoading(false);
      });
  }, [loading]);

  const handleUploadToRepository = () => {
    const repositoryCode = route.params.repoCode;
    setLoading(true);
    imagesToSend.map((image, index) => {
      upload_image({file: image.node}, repositoryCode);
    });
    setLoading(false);
    setSendImages(false);
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RepositoryRequest', {
                  repoId: route.params.repoId,
                })
              }>
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
            {imagesFromRepo &&
              imagesFromRepo.map((image, index) => (
                <ImageRepository
                  key={index}
                  imageLink={image.file}
                  base64={false}
                  deleteView={false}
                />
              ))}
            {imagesToSend &&
              imagesToSend.map((image, index) => (
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
              setImagesToSend(images);
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
