import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import Container from '../../generales/Container';
import CargandoModal from '../../generales/CargandoModal';
import {Header} from '../../generales/Header';
import ProductListCart from '../components/ProductListCart';
import ProductCartAddItem from '../components/ProductCartAddItem';
import {get_carts} from '../../utils/apis/cart_api';

const STATUS = 'draft';

function CartMainView({dispatch, navigation}) {
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);

  const loadCarts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await get_carts(STATUS);
      const selectedCarts = response.data.filter(
        (selectedCart) => selectedCart.total_pages > 10,
      );

      setCarts(selectedCarts);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  const handleGoToConfirm = () => navigation.navigate('ConfirmCart');

  const handleGoToFormatList = () =>
    navigation.navigate('FormatList', {projectId: 1});

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  useEffect(() => {
    loadCarts();
  }, [loadCarts]);

  return (
    <Container>
      <SafeAreaView>
        <CargandoModal title="Cargando" show={loading} />
        {!loading && (
          <>
            <Header />
            <>
              {!carts.length ? (
                <ProductCartAddItem onGoToFormatList={handleGoToFormatList} />
              ) : (
                <ProductListCart
                  carts={carts}
                  onGoToConfirm={handleGoToConfirm}
                />
              )}
            </>
          </>
        )}
      </SafeAreaView>
    </Container>
  );
}

export default connect(null)(CartMainView);
