import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize';
import { tipoDeLetra, colores } from '../../constantes/Temas'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ProfileMenuItem = ({name, icon, color, divider = true}) =>{
    return(
        <TouchableOpacity style={{backgroundColor: colores.blanco}}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, }}>
                <Icon
                    name={icon}
                    style={{ marginRight: 15 }}
                    color={color}
                    size={20}
                ></Icon>
                <Text 
                    style={{ fontSize: RFPercentage(2), fontFamily: tipoDeLetra.bold, fontWeight: 'bold', color: colores.gris }}>
                    {name}
                </Text>
                <Icon
                    name='keyboard-arrow-right'
                    style={{ marginLeft: 'auto' }}
                    color={colores.gris}
                    size= {25}
                ></Icon>
            </View>
            {
                divider && <View style={{ height: 0.5, marginVertical: 5, backgroundColor: colores.gris }}></View>
            }
        </TouchableOpacity>
    )
}