import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {colores, estiloDeLetra} from '../../../../constantes/Temas'

export const AlbumListItem = ({onPress}) => {
    return(
        <View style={{ width: '95%', marginVertical: 15, elevation: 3, backgroundColor: colores.blanco}}>
            <TouchableOpacity onPress={onPress}>
                <View>
                    <Image style={{height: 300, width: '100%'}} 
                        source={require('../../../../assets/img/slide3.jpg')} resizeMode="cover" />
                </View>
                <View style={{ width: '95%', marginTop: 30, alignSelf: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 'auto', color: colores.gris}}>23 a 60 páginas</Text>
                        <Text style={{color: colores.gris}}>23 a 60 páginas</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 20}}>
                        <Text style={{marginRight: 'auto', ...estiloDeLetra.negrita, fontSize: RFPercentage(2.5)}}>Album 14x14cm</Text>
                        <Text style={{...estiloDeLetra.negrita, fontSize: RFPercentage(2.5)}}>CLP$ 15.000</Text>
                    </View>
                </View>
                <View style={{width: '100%', height: 5, backgroundColor: colores.naranja}} />
            </TouchableOpacity>
        </View>
    )
}