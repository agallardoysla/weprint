import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, View, Text, StyleSheet, Image, TextInput} from 'react-native';
import Container from '../../generales/Container';
import { colores, estiloDeLetra } from '../../constantes/Temas';
import { RFPercentage } from 'react-native-responsive-fontsize';
import UploadIcon from '../../assets/img/upload.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';

function UploadRepository(){

    return (
          <Container footer={false}>
              <View style={{marginTop: 25, alignItems: 'center'}}>
                <UploadIcon height={200} width={200} />
                <View style={{width: '100%', alignItems: 'center', marginVertical: 30}}>
                    <TextInput
                        style={styles.loginInput}
                        placeholder={'NOMBRE REPOSITORIO'}
                        autoCapitalize="none"
                        autoCapitalize="none"
                        placeholderTextColor={colores.button}
                    />
                    <TextInput
                        style={styles.loginInput}
                        placeholder={'SUBIR PORTADA'}
                        autoCapitalize="none"
                        autoCapitalize="none"
                        placeholderTextColor={colores.button}
                    />
                </View>
              </View>
              <Image style={{width: '80%', height: 180, backgroundColor: 'red', alignSelf: 'center', borderColor: colores.blanco, borderWidth: 10}} /> 
              <TouchableOpacity>
                <View style={{paddingVertical: 20, paddingHorizontal: 40, backgroundColor: colores.button, width: 190, borderRadius: 50, marginTop: 30, alignSelf: 'center'}}>
                    <Text style={{...estiloDeLetra.negrita, color: colores.blanco, textAlign:'center', fontSize: RFPercentage(1.5)}}>CREAR</Text>
                </View>
              </TouchableOpacity>
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
