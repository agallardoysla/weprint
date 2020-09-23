import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, Keyboard} from 'react-native';
import {colores, estiloDeLetra, tipoDeLetra} from '../../constantes/Temas';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';

export const MainForm = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(selectedDate);
  };

  const log = () => alert('ttehethet');

  return (
    <View style={{width: '90%', marginVertical: 25}}>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        placeholderTextColor={colores.grisClaro}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        placeholderTextColor={colores.grisClaro}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.input} pointerEvents={'none'}>
          <Text
            style={{
              ...estiloDeLetra.negrita,
              color: colores.grisClaro,
              fontSize: RFPercentage(2),
            }}>{`${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</Text>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
      <TextInput
        placeholder="Nombre de Usuario"
        style={styles.input}
        placeholderTextColor={colores.grisClaro}
      />
      <TextInput
        placeholder="Correo"
        style={styles.input}
        placeholderTextColor={colores.grisClaro}
      />
      <TextInput
        placeholder="Direccion"
        style={styles.input}
        placeholderTextColor={colores.grisClaro}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('hello')}>
        <Text style={styles.buttonTitle}>ACTUALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderRadius: 50,
    backgroundColor: colores.blanco,
    shadowOpacity: 0.5,
    elevation: 0.5,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: -4},
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: RFPercentage(2),
    ...estiloDeLetra.negrita,
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 18,
    marginTop: 10,
    backgroundColor: '#f18263',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },

  buttonTitle: {
    color: 'white',
    fontSize: RFPercentage(1.75),
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
  },
});
