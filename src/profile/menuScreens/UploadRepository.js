import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, View, Text, StyleSheet, Image, TextInput, Modal} from 'react-native';
import Container from '../../generales/Container';
import { create_repository } from '../../utils/apis/repository_api';
import { colores, estiloDeLetra } from '../../constantes/Temas';
import { RFPercentage } from 'react-native-responsive-fontsize';
import UploadIcon from '../../assets/img/upload.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectionListImage from '../../generales/SelectionListImage'
import * as Animatable from 'react-native-animatable';
import CargandoModal from '../../generales/CargandoModal';

function UploadRepository({navigation}){

    const [data, setData] = useState({
        repoName: null,
        coverPage: "prev"
    })
    const [validateData, setValidateData] = useState(null)
    const [showListImage, setShowListImage] = useState(false)
    const [loading, setloading] = useState(false);

    const createRepositoryHandle = async () => {
        const {repoName, coverPage} = data;

        if (!data.repoName && !data.coverPage) {
            setValidateData(false);
            return false;
          }
        let body = {
          name: repoName.trim(),
          preview: coverPage.trim()
        };

        console.log(body)
        setValidateData(true);
        if (validateData === true) {
            setloading(true);
            create_repository(body).then((response) => {
            console.log(response);
            //response.errors && setError(true);
            setloading(false);
            navigation.navigate("RepositoryDescription")
          });
        }
      };

    console.log(data)

    return (
          <Container footer={false}>
            <CargandoModal title="Validando, porfavor espere..." show={loading} />
              <View style={{marginTop: 25, alignItems: 'center'}}>
                <UploadIcon height={200} width={200} />
                <View style={{width: '100%', alignItems: 'center', marginVertical: 30}}>
                    <TextInput
                        style={styles.loginInput}
                        placeholder={'NOMBRE REPOSITORIO'}
                        autoCapitalize="none"
                        autoCapitalize="none"
                        placeholderTextColor={colores.button}
                        onChangeText={(e) => setData({...data, repoName: e})}
                    />                   
                    <TouchableOpacity onPress={() => setShowListImage(true)} style={{width: 330, height: 65,backgroundColor: colores.blanco, textAlign: 'center', justifyContent: 'center',borderRadius: 50, elevation: 2.5}}>
                            <Text style={{ ...estiloDeLetra.negrita, color: colores.button ,alignSelf:'center'}}>SUBIR PORTADA</Text>
                    </TouchableOpacity>
                </View>
              </View>
              <Image source={data.coverPage ? {uri: `data:image/jpeg;base64,${data.coverPage}`} : require('../../assets/img/upload_cover.jpg') } 
                resizeMode="stretch" style={{width: '80%', height: 180, alignSelf: 'center', borderColor: colores.blanco, borderWidth: 10}} 
              /> 
              <TouchableOpacity onPress={() => createRepositoryHandle()}>
                <View style={{paddingVertical: 20, paddingHorizontal: 40, backgroundColor: colores.button, width: 190, borderRadius: 50, marginTop: 30, alignSelf: 'center'}}>
                    <Text style={{...estiloDeLetra.negrita, color: colores.blanco, textAlign:'center', fontSize: RFPercentage(1.5)}}>CREAR</Text>
                </View>
              </TouchableOpacity>
              {
                  validateData === false && (
                    <Animatable.View animation="bounceIn">
                        <Text
                            style={{
                            color: 'red',
                            textAlign: 'center',
                            marginVertical: 10,
                            }}>
                                Completa los Datos
                        </Text>
                    </Animatable.View>)
              }
              <Modal visible={showListImage} hardwareAccelerated={true} animationType="slide" >
                <SelectionListImage onResponse={(image) => {setData({ ...data, coverPage: image[0].base64}); setShowListImage(false); console.log(data)}} 
                    onPressGoToBack={() => setShowListImage(false)} 
                />
              </Modal>
          </Container>
    );
}

const styles = StyleSheet.create({
    loginInput: {
        height: 65,
        width: '80%',
        paddingLeft: 20,
        elevation: 0.75,
        borderRadius: 50,
        backgroundColor: colores.blanco,
        ...estiloDeLetra.negrita,
        textAlign: 'center',
        elevation: 2.5,
        marginVertical: 10,
      },
})

export default UploadRepository;
