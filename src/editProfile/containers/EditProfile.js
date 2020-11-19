import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container';
import CargandoModal from '../../generales/CargandoModal';
import ButtonReload from '../../generales/ButtonReload';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainForm} from '../components/MainForm';
import {colores} from '../../constantes/Temas';
import {get_profile_api} from '../../utils/apis/login_api';
import {actions} from '../../redux';

function EditProfile({navigation, dispatch, profile}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUserData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      if (!profile) {
        const response = await get_profile_api();
        dispatch(actions.actualizarProfile(response.data[0]));
      }

      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, [dispatch, profile]);

  const handleUpdateProfile = (data) =>
    dispatch(actions.actualizarProfile(data));

  const handleGoBack = () => navigation.navigate('Profile');

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  return (
    <>
      <CargandoModal title="Cargando" show={loading} />

      <Container footer={false}>
        {error && <ButtonReload onReload={getUserData} />}

        {!loading && !error && (
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            <Image
              style={style.bgHeader}
              source={require('../../assets/img/bg-app.png')}
            />
            <View style={style.arrowContainer}>
              <TouchableOpacity onPress={handleGoBack} delayPressIn={0}>
                <Icon name="arrow-back" color={colores.blanco} size={40} />
              </TouchableOpacity>
            </View>

            <MainForm profile={profile} onUpdateProfile={handleUpdateProfile} />
          </ScrollView>
        )}
      </Container>
    </>
  );
}

const style = StyleSheet.create({
  bgHeader: {
    height: 200,
    width: '100%',
  },
  arrowContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 999,
    elevation: 999,
  },
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile.data,
  };
};

export default connect(mapStateToProps)(EditProfile);
