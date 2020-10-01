import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';

function Format({dispatch, navigation, route}) {
  const {projectId} = route.params;

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  return <Text>Format page</Text>;
}

const mapStateToProps = (state) => ({login: state.login});

export default connect(mapStateToProps)(Format);
