import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize';
import { tipoDeLetra, colores } from '../constantes/Temas'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MenuList = ({list}) => {
    return(
        <View style={{ alignItems:'center', width: '90%', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colores.blanco, marginTop: 10}}>
            <View style={{width: '100%', paddingHorizontal: '5%', paddingVertical: '5%'}}>
                {
                    list.map((data, i) => {
                        return (
                            <TouchableOpacity style={{backgroundColor: colores.blanco}}>
                                <View key={i} 
                                    style={{flexDirection: 'row', alignItems: 'center', padding: 10, }}
                                >
                                    <Icon
                                        name={data.icon}
                                        style={{ marginRight: 15 }}
                                        color={data.color}
                                        size={20}
                                    ></Icon>
                                    <Text 
                                        style={{ fontSize: RFPercentage(2), fontFamily: tipoDeLetra.bold, fontWeight: 'bold', color: colores.gris }}>
                                        {data.name}
                                    </Text>
                                    <Icon
                                        name='keyboard-arrow-right'
                                        style={{ marginLeft: 'auto' }}
                                        color={colores.gris}
                                        size= {25}
                                    ></Icon>
                                </View>
                                {
                                    i != list.length-1 && <View style={{ height: 0.5, marginVertical: 5, backgroundColor: colores.gris }}></View>
                                }
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    )
}