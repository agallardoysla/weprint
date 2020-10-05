import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import Container from '../../../generales/Container';
import {AlbumListItem} from './components/AlbumListItem'
import {estiloDeLetra, colores, tipoDeLetra} from '../../../constantes/Temas'
import { RFPercentage } from 'react-native-responsive-fontsize';

function AlbumDescription({navigation}) {
    return(
        <Container footer={false}>
            <View>
                <View>
                    <Image style={{height: 300, width: '100%'}} 
                        source={require('../../../assets/img/album.jpeg')} resizeMode="cover" />
                </View>
            <View style={{paddingVertical: 40, paddingHorizontal: 20}}>
                    <Text style={{...estiloDeLetra.negrita, fontSize: RFPercentage(3)}}>Mini Book</Text>
                    <View style={{flexDirection: 'row', marginVertical: 20}}>
                        <Text style={{fontSize: RFPercentage(2.5), marginRight: 10}}>A partir de</Text>
                        <Text style={{fontSize: RFPercentage(2.5), ...estiloDeLetra.negrita}}>$15.000</Text>
                    </View>
                    <Text style={{fontSize: RFPercentage(2.4)}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log("work")}>
                    <Text style={styles.buttonTitle}>SELECCIONA</Text>
                </TouchableOpacity>
            </View>
        </Container>  
    )
}

const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 20,
      borderRadius: 30,
      paddingVertical: 18,
      marginTop: 10,
      backgroundColor: '#f18263',
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: RFPercentage(1.75),
        fontFamily: tipoDeLetra.bold,
        fontWeight: 'bold',
      },
})
export default AlbumDescription