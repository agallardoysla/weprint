/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

//importaciones necesarias para redux
import {connect} from 'react-redux';
import {actions} from './redux';
import Container from './generales/Container';
import {
  del_repository_api,
  get_profile_api,
  login_api,
  register_api,
  update_user_api,
} from './utils/apis/login_api';

function Home(props) {
  const {login, dispatch, navigation} = props;
  const [loading, setloading] = useState(false);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  useEffect(() => {
    //Ejemplos de uso de los servicios
    //-------------------------------------
    //register_api();
    //login_api();
    // get_profile_api().then((r) => {
    //   console.log('Home', r);
    // });
    // update_user_api();
    //del_repository_api();
  }, []);

  return (
    <Container style={styles.container}>
      <View style={{width: '100%', height: '100%'}}>
        <Text style={{marginTop: 0}}>Hola Mundo</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({login: state.login});
export default connect(mapStateToProps)(Home);
