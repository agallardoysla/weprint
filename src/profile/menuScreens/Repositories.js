import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import Container from '../../generales/Container';
import { colores, estiloDeLetra } from '../../constantes/Temas';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get_repositories } from '../../utils/apis/repository_api'
import Icon from 'react-native-vector-icons/FontAwesome';

function Repositories({route, cover, navigation}){
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log("data")
    const repoData = get_repositories().then((data) =>
    setData(data.data)
    );
    
  }, []);

  console.log(route.params)
  const photo = route.params
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F6FA'}}>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate("UploadRepository")}>
                <View style={{padding: 20, backgroundColor: colores.button, width: 190, borderRadius: 50, margin: 5}}>
                    <Text style={{...estiloDeLetra.negrita, color: colores.blanco, textAlign:'center',fontSize: RFPercentage(1.5)}}>+ CREAR REPOSITORIO</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{padding: 20, backgroundColor: colores.button, width: 190, borderRadius: 50, margin: 5}}>
                    <Text style={{...estiloDeLetra.negrita, color: colores.blanco, textAlign:'center', fontSize: RFPercentage(1.5)}}>SOLICITUDES</Text>
                </View>
            </TouchableOpacity>
        </View>
      <ScrollView>
        <Container footer={false}>
            
            <View style={{marginTop: 25}}>
                <RepoView coverPhoto={cover} />
                <RepoView coverPhoto={cover} />
                <RepoView coverPhoto={cover} available={false} />
            </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const RepoView = ({title, users, coverPhoto, available = true}) => (
    <View style={{borderRadius: 25, width: '95%', alignSelf: 'center', backgroundColor: colores.blanco, borderRadius: 25, overflow: 'hidden', marginBottom: 40}}>
        <Image source={{uri: coverPhoto}} style={{width: '100%', height: 250, borderRadius: 25}}/>
        <View style={{padding: 20}}>
            {
                available === true ? (
                    <View>
                        <View style={{backgroundColor: colores.naranja, flexDirection: 'row', alignSelf: 'flex-start', borderRadius: 5, padding: 3, marginBottom: 5}}>
                            <Icon name="eye" style={{marginHorizontal: 5}} size={20} />
                            <Text style={{marginRight: 5, ...estiloDeLetra.negrita}}>Disponible</Text>
                        </View>
                    
                    </View>
                ) : (
                    <View style={{backgroundColor: colores.rojo, flexDirection: 'row', alignSelf: 'flex-start', borderRadius: 5, padding: 3, marginBottom: 5}}>
                        <Icon name="eye-slash" style={{marginLeft: 5}} size={20} color={colores.blanco} />
                        <Text style={{marginHorizontal: 10, ...estiloDeLetra.negrita, color: colores.blanco}}>No Disponible</Text>
                    </View> 
                )
            }
            <Text style={{...estiloDeLetra.negrita, fontSize: RFPercentage(2), marginBottom: 20}}>Casamiento de Lucas</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="users" style={{marginHorizontal: 5}} size={20} color={colores.gris} />
                    <Text style={{color: colores.gris}}>3</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="image" style={{marginHorizontal: 5}} size={20} color={colores.gris} />
                    <Text style={{color: colores.gris}}>20</Text>
                </View>
            </View>
        </View>
    </View>
)

export default Repositories;

Repositories.defaultProps = {
    cover: 'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg'
}