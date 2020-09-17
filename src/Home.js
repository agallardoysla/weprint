/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

//importaciones necesarias para redux
import {connect} from 'react-redux';
import {actions} from './redux';
import Container from './generales/Container';

function Home(props) {
  const {login, dispatch, navigation} = props;
  const [loading, setloading] = useState(false);

  console.log('Home', login);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
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
