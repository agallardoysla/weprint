import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../redux';
import sumBy from 'lodash/sumBy';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {estiloDeLetra, colores} from '../../constantes/Temas';
import {get_carts} from '../../utils/apis/cart_api';

const STATUS = 'draft';

const CartItem = ({cart}) => (
  <View style={style.cartItem}>
    <Text>{cart.name}</Text>
    <Text style={style.cartPrice}>${cart.total_price}</Text>
  </View>
);

function ConfirmCart({dispatch, navigation, carts}) {
  const renderCarts = ({item: cart}) => <CartItem cart={cart} />;

  const getButtonStyles = (totalHeight) => {
    const priceContainerHeight = (totalHeight * 74) / 100;
    const consumedHeight = priceContainerHeight + 76;
    const marginVertical = Math.abs((totalHeight - consumedHeight) / 2);

    return StyleSheet.create({
      button: {
        width: '60%',
        paddingVertical: 10,
        marginVertical: marginVertical,
        alignSelf: 'center',
        borderRadius: 290486,
        backgroundColor: colores.cartButton,
      },
    });
  };

  useEffect(() => {
    dispatch(actions.actualizarNavigation(navigation));
  }, [dispatch, navigation]);

  return (
    <>
      <View style={style.priceContainer}>
        <Text style={style.listTitle}>Productos</Text>
        <FlatList
          contentContainerStyle={style.listContent}
          data={carts}
          keyExtractor={(cart) => cart.id.toString()}
          renderItem={renderCarts}
        />
        <View style={style.listFooter}>
          <Text style={style.total}>Total</Text>
          <Text style={style.cartPrice}>
            ${sumBy(carts, (cart) => cart.total_price)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={getButtonStyles(useWindowDimensions().height).button}>
        <Text style={style.buttonText}>Pagar con Tarjeta</Text>
      </TouchableOpacity>
    </>
  );
}

const style = StyleSheet.create({
  priceContainer: {
    height: '74%',
    width: '100%',
    paddingTop: 16,
    backgroundColor: colores.blanco,
  },
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  listTitle: {
    marginLeft: 32,
    marginBottom: 5,
    ...estiloDeLetra.negrita,
    fontSize: 22,
  },
  listFooter: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: colores.grisClaro,
    borderTopWidth: 1,
  },
  total: {
    ...estiloDeLetra.negrita,
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cartPrice: {
    fontSize: RFPercentage(2),
    ...estiloDeLetra.negrita,
    color: colores.gris,
  },
  buttonText: {
    ...estiloDeLetra.negrita,
    color: colores.blanco,
    textAlign: 'center',
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  const carts = state.cart.data.filter(
    (cart) => cart.status === STATUS && cart.total_pages > 10,
  );

  return {carts};
};
export default connect(mapStateToProps)(ConfirmCart);
