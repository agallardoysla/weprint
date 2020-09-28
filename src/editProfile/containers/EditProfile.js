import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container';
import Background from '../../assets/img/bg-app.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainForm} from '../components/MainForm';
import {colores} from '../../constantes/Temas';
import {get_profile_api} from '../../utils/apis/login_api'


function EditProfile({navigation}) {
  const originalWidth = 300;
  const originalHeight = 150;
  
  useEffect(() => {
    const userData = get_profile_api().then((data) =>
      console.log(data.data),
    );
    return () => {
      cleanup
    }
  }, [input])

  return (
    <Container footer={false}>
      <SafeAreaView>
        <ScrollView>
          <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <View style={{position: 'absolute'}}>
              <Background width={Dimensions.get('screen').width} height={205} />
            </View>
            <View
              style={{
                width: '100%',
                height: '10%',
                justifyContent: 'center',
                position: 'absolute',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="arrow-back"
                  size={40}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
            <View
              style={{
                borderRadius: 150,
                borderWidth: 10,
                borderColor: colores.blanco,
                overflow: 'hidden',
                margin: 40,
              }}>
              <Image
                resizeMode="cover"
                style={{height: 220, width: 220}}
                source={{
                  uri:
                    'https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG',
                }}
              />
            </View>
            <MainForm />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(EditProfile);
