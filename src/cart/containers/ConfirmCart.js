import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {estiloDeLetra, colores} from '../../constantes/Temas'
import { TouchableOpacity } from 'react-native-gesture-handler';

function ConfirmCart({dispatch, navigation, route}) {
    const data = route.params.itemData

    const sumValues = (list, key) => {
        return list.reduce((a, b) => a + (b[key] || 0), 0);
    }
    const shippingPrice = 25
    let totalPrice = sumValues(data,'price') + shippingPrice

    console.log(totalPrice)

    useEffect(() => {
      dispatch(actions.actualizarNavigation(navigation));
    }, []);

    return(
        <Container footer={false}>
            <View style={{backgroundColor: colores.blanco, padding: 25}}>
                <SafeAreaView style={{maxHeight: '75%'}}>
                    <Text style={{fontSize: RFPercentage(4), marginBottom: 30, ...estiloDeLetra.negrita}}>Productos</Text>
                    <ScrollView>
                        {
                            data.map(({name, price}) => (
                                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                                    <Text>{name}</Text>
                                    <Text style={{marginLeft: 'auto', fontSize: RFPercentage(2), ...estiloDeLetra.negrita, color: colores.gris}}>
                                        ${price}
                                    </Text>
                                </View>
                            ))
                        }
                        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                            <Text>Envio:</Text>
                            <Text style={{marginLeft: 'auto', fontSize: RFPercentage(2), ...estiloDeLetra.negrita, color: colores.gris}}>
                                ${shippingPrice}
                            </Text>
                        </View>
                        
                    </ScrollView>
                </SafeAreaView>
                <View style={{backgroundColor: colores.grisClaro, height: 1.5, width: '100%', marginVertical: 20}} />
                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                    <Text style={{...estiloDeLetra.negrita}}>Total:</Text>
                    <Text style={{marginLeft: 'auto', fontSize: RFPercentage(2.5), ...estiloDeLetra.negrita, color: colores.gris}}>
                        ${totalPrice}
                    </Text>
                </View>
            </View>
            <View style={{width: '90%', padding: 15, backgroundColor: colores.cartButton, alignSelf: 'center', marginVertical: 30}}>
                <TouchableOpacity onPress={() => console.log("hello")}>
                        <Text style={{textAlign: 'center', ...estiloDeLetra.negrita, color: colores.blanco, fontSize: RFPercentage(2.2)}}>
                            Pagar con Tarjeta
                        </Text>
                </TouchableOpacity>
            </View>
        </Container>
    )

}

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(ConfirmCart);
