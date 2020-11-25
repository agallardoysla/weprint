import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/dist/Feather';
import merge from 'lodash/merge';
import {useTranslation} from 'react-i18next';
import {getDiscricts, getProvinces} from '../../utils/apis/location_api';
import {upload_image} from '../../utils/apis/project_api';
import {update_user_api} from '../../utils/apis/login_api';
import SelectionListImage from '../../generales/SelectionListImage';
import CargandoModal from '../../generales/CargandoModal';
import Cargando from '../../generales/Cargando';
import ButtonReload from '../../generales/ButtonReload';
import GeneralImage from '../../generales/GeneralImage';
import {colores, estiloDeLetra, tipoDeLetra} from '../../constantes/Temas';

export const MainForm = ({profile, onUpdateProfile}) => {
  const getUserDataFormat = (data) => {
    const location = data.address.split(',');

    return {
      ...data,
      address: location[0] ? location[0].trim() : null,
      comuna: location[1] ? location[1].trim() : null,
      province: location[2] ? location[2].trim() : null,
    };
  };
  const {t} = useTranslation();
  const [userData, setUserData] = useState(getUserDataFormat(profile));
  const [date, setDate] = useState(new Date(profile.birthdate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationSelector, setLocationSelector] = useState(0);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProvince, setLoadingProvince] = useState(true);
  const [errorProvince, setErrorProvince] = useState(false);
  const [discrictLocation, setDiscrictLocation] = useState([]);
  const [provinceLocation, setProvinceLocation] = useState([]);

  const loadProvinces = useCallback(async () => {
    if (!provinceLocation.length) {
      setLoadingProvince(true);
      setErrorProvince(false);

      try {
        const response = await getProvinces();

        if (userData.province) {
          const selectedProvince = response.data.find(
            (province) => province.name === userData.province,
          );
          setLocationSelector(selectedProvince.id);
        }

        setProvinceLocation(response.data);
        setLoadingProvince(false);
      } catch {
        setLoadingProvince(false);
        setErrorProvince(true);
      }
    }
  }, [userData.province, provinceLocation.length]);

  const loadDistricts = useCallback(async () => {
    setDiscrictLocation([]);

    try {
      if (locationSelector !== 0) {
        const response = await getDiscricts(locationSelector);
        setDiscrictLocation(response.data);
      }
    } catch {
      Alert.alert('No se pudo cargar comunas, revisa tu conexión');
    }
  }, [locationSelector]);

  useEffect(() => {
    loadProvinces();
  }, [loadProvinces]);

  useEffect(() => {
    if (locationSelector) {
      loadDistricts();
    }
  }, [locationSelector, loadDistricts]);

  const changeValues = (value, datakey) => {
    setUserData({
      ...userData,
      [datakey]: value,
    });
  };

  const onChange = (evt, selectedDate) => {
    if (selectedDate) {
      let dateFormat = new Date(evt.nativeEvent.timestamp);
      let dateParse = JSON.stringify(dateFormat);
      let dateSplit = dateParse.split('T');
      dateSplit = dateSplit[0].replace(/"/g, '');

      setShowDatePicker(false);
      setDate(selectedDate);
      setUserData(() => ({
        ...userData,
        birthdate: dateSplit,
      }));
    } else {
      setShowDatePicker(false);
    }
  };

  const uploadImage = async (image) => {
    try {
      const response = await upload_image({file: image.node});
      const cloudImage = JSON.parse(response);

      return cloudImage.url;
    } catch (error) {
      throw 'No se pudo guardar imagen';
    }
  };

  const handleServerError = ({code_err, message}) => {
    if (code_err === 302 && message) {
      const translateFormat = message.replace(/\s/g, '_').toUpperCase();

      Alert.alert(t(translateFormat));
    } else {
      Alert.alert('No se pudo guardar cambios, intenta de nuevo');
    }
  };

  const editProfileHandle = async () => {
    if (!userData.comuna || !userData.province) {
      Alert.alert('Ingresa ambos datos de ubicación: comuna y provincia');
      return;
    }

    setLoading(true);

    let avatar = userData.avatar;

    if (userData.avatar.uri && userData.avatar.node) {
      try {
        avatar = await uploadImage(userData.avatar);
      } catch {
        Alert.alert('No se pudo guardar cambios, intenta de nuevo');
        setLoading(false);
      }
    }
    let body = {
      nickname: userData.nickname,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      address: `${userData.address}, ${userData.comuna}, ${userData.province}`,
      birthdate: userData.birthdate,
      district_id: userData.district_id,
      avatar,
    };

    try {
      const response = await update_user_api(body);

      if (response.success) {
        const profileData = merge(
          {...profile, district_name: userData.district_name},
          response.data[0],
        );

        setUserData(getUserDataFormat(response.data[0]));
        onUpdateProfile(profileData);
        Alert.alert('Cambios guardados con éxito');
      }

      if (response.errors) {
        handleServerError(response.errors);
      }

      setLoading(false);
    } catch {
      Alert.alert('No se pudo guardar cambios, intenta de nuevo');
      setLoading(false);
    }
  };

  const handleChangeProvince = (provinceId) => {
    const selectedProvince = provinceLocation.find(
      (province) => province.id === provinceId,
    );

    setLocationSelector(provinceId);
    setUserData({
      ...userData,
      province: selectedProvince.name,
      comuna: '',
    });
  };

  const handleChangeDistrict = (districtId) => {
    const selectedDistrict = discrictLocation.find(
      (district) => district.id === districtId,
    );

    setUserData({
      ...userData,
      district_id: districtId,
      district_name: selectedDistrict.name,
      comuna: selectedDistrict.name,
    });
  };

  return (
    <>
      <CargandoModal title="Validando datos..." show={loading} />

      <View style={style.avatarContainer}>
        <TouchableOpacity
          style={style.avatarPressContainer}
          onPress={() => setShowImagePicker(true)}>
          <GeneralImage
            uri={userData.avatar.uri ? userData.avatar.uri : userData.avatar}
            styleImg={style.avatar}
          />
          <View style={style.avatarAdd}>
            <Icon name="plus" color={colores.blanco} size={12} />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        {loadingProvince && (
          <View style={style.loaderContainer}>
            <Cargando titulo=" " loaderColor={colores.logo} />
          </View>
        )}
        {errorProvince && <ButtonReload onReload={loadProvinces} />}
        {!errorProvince && !loadingProvince && (
          <View style={style.formMainContainer}>
            <View style={style.formContainer}>
              <TextInput
                placeholder="Nombre"
                style={style.input}
                placeholderTextColor={colores.gris}
                defaultValue={userData.firstname}
                onChangeText={(val) => changeValues(val, 'firstname')}
              />
              <TextInput
                placeholder="Apellido"
                style={style.input}
                placeholderTextColor={colores.gris}
                defaultValue={userData.lastname}
                onChangeText={(val) => changeValues(val, 'lastname')}
              />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={style.input}>
                  <Text style={style.dateText}>{`${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}</Text>
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                />
              )}
              <TextInput
                placeholder="Nombre de Usuario"
                style={style.input}
                placeholderTextColor={colores.gris}
                defaultValue={userData.nickname}
                onChangeText={(val) => changeValues(val, 'nickname')}
              />
              <TextInput
                placeholder="Email"
                style={style.input}
                placeholderTextColor={colores.gris}
                defaultValue={userData.email}
                onChangeText={(val) => changeValues(val, 'email')}
              />
              <TextInput
                placeholder="Dirección"
                style={style.input}
                placeholderTextColor={colores.gris}
                defaultValue={userData.address}
                onChangeText={(val) => changeValues(val, 'address')}
              />
              <View style={style.input}>
                <Picker
                  selectedValue={locationSelector}
                  onValueChange={handleChangeProvince}
                  itemStyle={style.pickerContent}
                  style={style.pickerContainer}>
                  <Picker.Item label={'- Seleccione Provincia-'} value="" />
                  {provinceLocation &&
                    provinceLocation.map((province) => (
                      <Picker.Item
                        key={province.id}
                        label={province.name}
                        value={province.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={style.input}>
                <Picker
                  selectedValue={userData.district_id}
                  onValueChange={handleChangeDistrict}
                  itemStyle={style.pickerContent}
                  style={style.pickerContainer}>
                  <Picker.Item label={'- Seleccione Comuna -'} value={false} />
                  {discrictLocation &&
                    discrictLocation.map((district) => (
                      <Picker.Item
                        key={district.id}
                        label={district.name}
                        value={district.id}
                      />
                    ))}
                </Picker>
              </View>

              <TouchableOpacity
                style={style.button}
                delayPressIn={0}
                onPress={() => editProfileHandle()}>
                <Text style={style.buttonTitle}>ACTUALIZAR</Text>
              </TouchableOpacity>

              <Modal
                visible={showImagePicker}
                hardwareAccelerated={true}
                animationType="slide">
                <SelectionListImage
                  maxQuantity={1}
                  minQuantity={1}
                  onResponse={(images) => {
                    setShowImagePicker(false);
                    setUserData({...userData, avatar: images[0]});
                  }}
                  onPressGoToBack={() => setShowImagePicker(false)}
                />
              </Modal>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  formMainContainer: {
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    marginVertical: 25,
  },
  avatar: {
    height: 170,
    width: 170,
    alignSelf: 'center',
    borderRadius: 85,
    borderWidth: 8,
    borderColor: colores.blanco,
    backgroundColor: colores.fondoScreen,
  },
  avatarContainer: {
    position: 'absolute',
    top: 30,
    justifyContent: 'flex-end',
    height: 200,
    alignSelf: 'center',
  },
  avatarAdd: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: colores.logo,
  },
  avatarPressContainer: {
    paddingBottom: 8,
  },
  loaderContainer: {
    marginTop: 20,
  },
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
  dateText: {
    ...estiloDeLetra.negrita,
    fontSize: RFPercentage(2),
  },
  animationText: {
    marginVertical: 10,
    color: colores.cartButton,
    textAlign: 'center',
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
  pickerContainer: {
    height: 25,
  },
  pickerContent: {
    height: 125,
  },
});
