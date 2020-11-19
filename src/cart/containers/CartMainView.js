import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import Container from '../../generales/Container';
import CargandoModal from '../../generales/CargandoModal';
import {Header} from '../../generales/Header';
import ProductListCart from '../components/ProductListCart';
import ProductCartAddItem from '../components/ProductCartAddItem';
import ButtonReload from '../../generales/ButtonReload';
import {get_carts} from '../../utils/apis/cart_api';

const STATUS = 'draft';

function CartMainView({navigation}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [carts, setCarts] = useState([]);

  const loadCarts = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await get_carts(STATUS);
      const selectedCarts = response.data.filter(
        (selectedCart) => selectedCart.total_pages > 10,
      );

      setCarts(selectedCarts);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);

  const handleGoToConfirm = () => navigation.navigate('ConfirmCart');

  const handleGoToFormatList = () =>
    navigation.navigate('FormatList', {projectId: 1});

  useEffect(() => {
    loadCarts();
  }, [loadCarts]);

  return (
    <Container>
      <SafeAreaView>
        <CargandoModal title="Cargando" show={loading} />
        {!loading && <Header />}
        {error && <ButtonReload onReload={loadCarts} />}
        {!loading && !error && (
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
        )}
      </SafeAreaView>
    </Container>
  );
}

export default connect(null)(CartMainView);
