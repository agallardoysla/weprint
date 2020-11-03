import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Container from '../../../generales/Container';
import {AlbumListItem} from './components/AlbumListItem'

function AlbumList({navigation}) {
    return(
        <SafeAreaView>
            <ScrollView>
                <Container footer={false}>
                    <View style={{alignItems: 'center'}}>
                        <AlbumListItem onPress={() => navigation.navigate("AlbumDescription")} />
                        <AlbumListItem />
                    </View>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AlbumList