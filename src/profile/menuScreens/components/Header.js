import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';

export const Header = () => (
    <View style={{alignItems: 'center', paddingBottom: '20%'}}>
        <Image style={{backgroundColor: 'red'}} source={require('../../../assets/img/bg-app.png')} height={200} width={'100%'}/>
        <View style={{position: 'absolute'}}>
            <View style={{alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <Image style={styles.logoContainer} height={150} width={150} source={{uri: 'https://viajes.nationalgeographic.com.es/medio/2013/09/02/hemis_0314966_1000x766.jpg'}} />
                </View>
            </View>
        </View>
    </View>
)


const styles = StyleSheet.create({
    logoContainer: {
      top: '20%',
      backgroundColor: '#f5f6fa',
      padding: 15,
      borderRadius: 100,
      borderWidth: 8,
      borderColor: '#FFFFFF',
    },
  });