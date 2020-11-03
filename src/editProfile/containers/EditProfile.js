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


function EditProfile({navigation, route}) {

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
            
            <MainForm data={route.params} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(EditProfile);
