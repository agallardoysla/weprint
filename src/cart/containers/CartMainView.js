import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { colores, estiloDeLetra } from '../../constantes/Temas';
import { ProductItem } from '../components/ProductItem'
import { Header } from '../../generales/Header'

function CartMainView({dispatch, navigation, items}) {
  const [isCartEmpty, setCartEmpty] = useState(Object.keys(items.shortlisted).length !== 0 ? false : true)  
  const [itemData, setItemData] = useState(Object.values(items.shortlisted))  
  console.log(items)

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  return (
    <Container>
      <SafeAreaView>
        <Header />
        <ScrollView>
          {
              isCartEmpty ? (
                <View style={{width: '100%', height: '100%', alignItems: 'center', marginTop: 30}}>
                    <Image source={require('../../assets/img/carro_weprint.gif')} style={{height: 250, width: 250}} />
                    <View style={{alignItems: 'center', marginTop: 20, marginBottom: 50}}>
                        <Text style={{fontSize: RFPercentage(2), ...estiloDeLetra.negrita, marginBottom: 15}}>Tu cesta está vacía</Text>
                        <Text style={{fontSize: RFPercentage(1.75), ...estiloDeLetra.negrita}}>¡Parece que aún no elegiste tus productos!</Text>
                    </View>
                    <View style={{width: '80%', padding: 20, backgroundColor: colores.blanco, elevation: 2, borderRadius: 50}}>
                    <TouchableWithoutFeedback onPress={() => navigation.push("Home")}>
                            <Text style={{textAlign: 'center', ...estiloDeLetra.negrita, color: colores.dorado}}>+ AÑADIR UN PRODUCTO</Text>
                    </TouchableWithoutFeedback>
                    </View>
                </View>
              ) : (
                <View style={{width: '100%', height: '100%', flex: 1, paddingBottom: '25%'}}>
                    <Text style={{...estiloDeLetra.negrita, marginTop: 30, marginLeft: 30}}>Productos en tu cesta</Text>
                      {
                        itemData.map((item, key)=>{
                            return <ProductItem key={key} {...item} />
                        })
                      }
                    <View style={{width: '80%', padding: 20, backgroundColor: colores.blanco, elevation: 2, borderRadius: 50, alignSelf: 'center', marginBottom: 30}}>
                        <TouchableWithoutFeedback onPress={() => navigation.push("ConfirmCart", {itemData})}>
                                <Text style={{textAlign: 'center', ...estiloDeLetra.negrita, color: colores.dorado}}>IR A COMPRAR</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
              )
          }
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

const mapStateToProps = (state) => ({login: state.login, items: state.cart});
export default connect(mapStateToProps)(CartMainView);