import React, {useEffect, useCallback} from 'react';
import {nanoid} from 'nanoid/non-secure';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import SelectionListImage from '../../generales/SelectionListImage';

function SelectImagen({dispatch, navigation, format}) {
  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, []);

  const handleOnPressGoToBack = () => navigation.goBack();
  const handleOnResponse = (images) => {
    const storageId = nanoid();
    dispatch(actions.actualizarImagenes(storageId, images));

    navigation.navigate('CartLayout', {
      storageId,
      formatId: format.id,
    });
  };

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
