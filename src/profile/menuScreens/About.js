import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import TextView from './components/TextView';
import Container from '../../generales/Container';

function About() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Container footer={false}>
          <TextView title="Somos #Weprint" />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default About;
