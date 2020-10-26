import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import Container from '../../generales/Container';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colores, estiloDeLetra } from '../../constantes/Temas';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ProjectPreview } from '../components/ProjectPreview'
import CargandoModal from '../../generales/CargandoModal'
import {get_albums_api} from '../../utils/apis/cart_api'

function Albums({navigation}) {
  const [albumData, setAlbumData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get_albums_api().then((data) =>{
        setAlbumData(data.data)
      setLoading(false)
    });
  }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F6FA'}}>
        <CargandoModal show={loading} title={"Cargando"} />
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('AlbumRequest')}>
                <View style={{padding: 20, backgroundColor: colores.button, width: 190, borderRadius: 50, margin: 5}}>
                    <Text style={{...estiloDeLetra.negrita, color: colores.blanco, textAlign:'center', fontSize: RFPercentage(1.5)}}>SOLICITUDES</Text>
                </View>
            </TouchableOpacity>
        </View>
      <ScrollView>
        <Container footer={false}>    
            <View style={{marginTop: 25}}>
                {
                    albumData && albumData.map((album, index) => <ProjectPreview key={index} title={album.name} coverPhoto={album.file} available={album.status === "draft" ? true : false} 
                        totalPieces={album.total_pieces} totalShared={album.total_shared} 
                    />)
                }
            </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Albums;

Albums.defaultProps = {
    cover: 'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg'
}