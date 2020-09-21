import React, {useEffect, useState} from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { TextView } from './components/TextView'

function Policy(){
    return(
        <SafeAreaView>
            <ScrollView>
                <TextView title="Políticas de privacidad" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Policy