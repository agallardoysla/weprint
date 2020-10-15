import React, {useEffect} from 'react';
import {nanoid} from 'nanoid/non-secure';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import has from 'lodash/has';
import SelectionListImage from '../../generales/SelectionListImage';

//Seleccionar imagenes
function SelectImagen({dispatch, navigation, format, route}) {
  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  const handleOnPressGoToBack = () => navigation.goBack();
  const handleOnResponse = (images) => {
    const storageId = has(route.params, 'storageId')
      ? route.params.storageId
      : nanoid();

    dispatch(actions.actualizarImagenes(storageId, images));

    navigation.navigate('CartLayout', {
      storageId,
      formatId: format.id,
    });
  };

  //(image) => image
  return (
    <SelectionListImage
      minQuantity={format.min_quantity}
      onResponse={handleOnResponse}
      onPressGoToBack={handleOnPressGoToBack}
    />
  );
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

export default connect(mapStateToProps)(SelectImagen);
