import React, {useEffect, useState} from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { TextView } from './components/TextView'

function About(){
    return(
        <SafeAreaView>
            <ScrollView>
                <TextView title="Somos #Weprint" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default About