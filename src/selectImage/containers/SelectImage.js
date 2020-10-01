import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';

function SelectImage({dispatch, navigation}) {
  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  return <Text>Select image</Text>;
}
const mapStateToProps = (state) => ({login: state.login});

export default connect(mapStateToProps)(SelectImage);
