import React, {useEffect, useState} from 'react';
import {nanoid} from 'nanoid/non-secure';
import {connect} from 'react-redux';
import {actions} from '../../../redux';
import SelectionListImage from '../../../generales/SelectionListImage';
import CartLayoutFormName from '../components/CartLayoutFormName';
import CartLayoutFormReview from '../components/CartLayoutFormReview';

function CartLayoutCreate({dispatch, navigation, format}) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [projectReview, setProjectReview] = useState('');

  const handleOnPressGoToBack = () => navigation.goBack();
  const handleGoToStepOne = () => setStep(1);
  const handleGoToStepTwo = () => setStep(2);
  const hangleGoToStepThree = () => setStep(3);

  const getPages = (images) => {
    const pages = images.map((img, index) => ({
      number: index,
      layout_id: null,
      pieces: [
        {
          order: 0,
          file: img.uri,
        },
      ],
    }));

    return pages;
  };

  const handleCalculatePrice = (totalPages) => {
    const minQuantity = format.min_quantity;
    const minPrice = format.min_price;
    const priceUnit = format.price_unit;

    if (totalPages > minQuantity) {
      return minPrice + (totalPages - minQuantity) * priceUnit;
    }

    return minPrice;
  };

  const handleSaveCartLayout = (storageId, images) => {
    const pages = getPages(images);

    const cart = {
      id: storageId,
      format_id: format.id,
      name: projectName,
      description: projectReview,
      pages,
      price: handleCalculatePrice(pages.length),
    };

    dispatch(actions.agregarCart(cart));
  };

  const handleOnResponse = (images) => {
    const storageId = nanoid();

    dispatch(actions.actualizarImagenes(storageId, images));
    handleSaveCartLayout(storageId, images);

    navigation.navigate('CartLayoutDetail', {
      cartId: storageId,
      formatId: format.id,
    });
  };

  const handleChangeName = (name) => setProjectName(name);
  const handleChangeReview = (review) => setProjectReview(review);

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  return (
    <>
      {step === 1 && (
        <CartLayoutFormName
          projectName={projectName}
          onChangeName={handleChangeName}
          onPressGoBack={handleOnPressGoToBack}
          onPressNextStep={handleGoToStepTwo}
        />
      )}
      {step === 2 && (
        <CartLayoutFormReview
          projectReview={projectReview}
          onPressGoBack={handleGoToStepOne}
          onChangeReview={handleChangeReview}
          onPressNextStep={hangleGoToStepThree}
        />
      )}
      {step === 3 && (
        <SelectionListImage
          minQuantity={format.min_quantity}
          onResponse={handleOnResponse}
          onPressGoToBack={handleGoToStepTwo}
        />
      )}
    </>
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

export default connect(mapStateToProps)(CartLayoutCreate);
