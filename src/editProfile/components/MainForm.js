import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, Keyboard} from 'react-native';
import {colores, estiloDeLetra, tipoDeLetra} from '../../constantes/Temas';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-community/picker';
import {getDiscricts, getProvinces} from '../../utils/apis/location_api'
import {update_user_api} from '../../utils/apis/login_api'


export const MainForm = ({data}) => {
  const [userData, setUserData] = useState(data)
  const [date, setDate] = useState(new Date(data.birthdate));
  const [mode, setMode] = useState('date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationSelector, setLocationSelector] = useState(data.district_name);
  const [success, setSuccess] = useState(false)

  console.log(userData)

  const [discrictLocation, setDiscrictLocation] = useState([]);
  const [provinceLocation, setProvinceLocation] = useState([]);


  useEffect(() => {
    const provinceData = getProvinces().then((data) =>
      setProvinceLocation(data.data),
    );
    console.log(provinceLocation)
  }, []);

  useEffect(() => {
    if (locationSelector) {
      const disctrictData = getDiscricts(locationSelector).then((data) =>
        setDiscrictLocation(data.data)
      );
    }
  }, [locationSelector])
  
  const changeValues = (value, datakey) => {
    setUserData({
      ...userData,
      [datakey]: value
    })
  }

  const onChange = (val, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setShowDatePicker(Platform.OS === 'ios');
    let date = new Date(val.nativeEvent.timestamp);
    let dateParse = JSON.stringify(date);
    let dateSplit = dateParse.split('T');
    dateSplit = dateSplit[0].replace(/"/g, '');
    setUserData((prevState) => ({
      ...userData,
      birthdate: dateSplit,
    }));
  };

  const editProfileHandle = async () => {
    let body = {
      nickname: userData.nickname,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      address: `${userData.address}, ${userData.comuna}, ${userData.province}`,
      birthdate: userData.birthdate,
      district_id: userData.district_id,
      avatar: ''
    };
    update_user_api(body).then((response) => {
      console.log(response);
      response.success && setSuccess(true)
      response.errors && setError(true);
    });
  };


  return (
    <View style={{width: '90%', marginVertical: 25}}>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        placeholderTextColor={colores.gris}
        defaultValue={data.firstname}
        onChangeText={(val) => changeValues(val, 'firstname')}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        placeholderTextColor={colores.gris}
        defaultValue={data.lastname}
        onChangeText={(val) => changeValues(val, 'lastname')}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.input} pointerEvents={'none'}>
          <Text
            style={{
              ...estiloDeLetra.negrita,
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
        placeholderTextColor={colores.gris}
        defaultValue={data.nickname}
        onChangeText={(val) => changeValues(val, 'nickname')}
      />
      <TextInput
        placeholder="Correo"
        style={styles.input}
        placeholderTextColor={colores.gris}
        defaultValue={data.email}
        onChangeText={(val) => changeValues(val, 'email')}
      />
      <TextInput
        placeholder="Direccion"
        style={styles.input}
        placeholderTextColor={colores.gris}
        defaultValue={data.address}
        onChangeText={(val) => changeValues(val, 'address')}
      />
      <View style={styles.input}>
        <Picker
          selectedValue={locationSelector}
          onValueChange={(val) =>{
            setLocationSelector(val)
            setUserData({...userData, district_id: val})
            }
          }
          itemStyle={{height: 120}}
          style={{height: 25}}
          >
          <Picker.Item label={'- Seleccione -'} value="" />
          {provinceLocation && provinceLocation.map((province) => (
            <Picker.Item
              key={province.id}
              label={province.name}
              value={province.id}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.input}>
        <Picker
          selectedValue={userData.comuna}
          onValueChange={(val) =>
            changeValues(val, 'comuna',)
          }
          itemStyle={{height: 120}}
          style={{height: 25}}  
        >
          <Picker.Item label={'- Seleccione -'} value={false} />
          {discrictLocation && discrictLocation.map((district) => (
            <Picker.Item
              key={district.id}
              label={district.name}
              value={district.name}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => editProfileHandle()}>
        <Text style={styles.buttonTitle}>ACTUALIZAR</Text>
      </TouchableOpacity>
      {
        success && 
          <Animatable.View animation="bounceIn">
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                marginVertical: 10,
              }}>
                  Los cambios se realizaron con exito!
            </Text>
          </Animatable.View>
      } 
    </View>
  );
}

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
