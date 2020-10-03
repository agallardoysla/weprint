import React from 'react';
import {Text} from 'react-native';

function Layout({dispatch, navigation, format}) {
  return <Text>Layout</Text>;
}

const mapStateToProps = (
  state,
  {
    route: {
      params: {formatId},
    },
  },
) => {
  const format = state.format.data.find(
    (searchedFormat) => searchedFormat.id === formatId,
  );

  return {
    format,
  };
};

export default connect(mapStateToProps)(Layout);
