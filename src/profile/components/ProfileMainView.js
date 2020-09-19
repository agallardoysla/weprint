import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize';
import { tipoDeLetra, colores } from '../../constantes/Temas'
//import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ProfileMainView = ({name, address}) => {
    return(
        <LinearGradient 
            colors={['#ffaa66', '#ff7584']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            style={{ alignItems:'center', width: '100%', height: '30%', justifyContent: 'center'}}
        >
            <Text style={{
                justifyContent: 'center',
                color: colores.blanco,
                fontSize: RFPercentage(3.5),
                fontFamily: tipoDeLetra.bold,
                marginBottom: 20,
                fontWeight: 'bold'
            }}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                    name='location-pin'
                    type='font-awsome'
                    color={colores.blanco}
                ></Icon>
                <Text 
                    style={{ marginLeft: 10, color: colores.blanco, fontFamily: tipoDeLetra.bold }}
                >
                    {address}
                </Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>EDITAR PERFIL</Text>
            </TouchableOpacity>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 50,
        borderRadius: 30,
        paddingVertical: 15,
        marginTop: 30,
        backgroundColor: colores.blanco,
    },

    buttonTitle: {
        color: '#f18263',
        fontWeight: "bold",
        fontFamily: tipoDeLetra.bold
    },
})

ProfileMainView.defaultProps = {
    name: 'gaston',
    address: 'Iquique, Chile',
}