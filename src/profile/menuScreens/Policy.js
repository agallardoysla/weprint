import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import TextView from './components/TextView';
import Container from '../../generales/Container';

function Policy() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Container footer={false}>
          <TextView title="Políticas de privacidad" />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Policy;
