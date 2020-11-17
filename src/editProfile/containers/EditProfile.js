import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container';
import Background from '../../assets/img/bg-app.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainForm} from '../components/MainForm';
import {colores} from '../../constantes/Temas';
import {get_profile_api} from '../../utils/apis/login_api';

function EditProfile({navigation, route}) {
  return (
    <>
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', top: -25}}>
          <Background width={Dimensions.get('screen').width} height={205} />
        </View>
        <ScrollView>
          <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <View
              style={{
                width: '100%',
                height: '10%',
                justifyContent: 'center',
                position: 'absolute',
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="arrow-back" color={colores.blanco} size={40} />
              </TouchableOpacity>
            </View>

            <MainForm data={route.params} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default connect(null)(EditProfile);
