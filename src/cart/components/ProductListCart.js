import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ProductCart from './ProductCart';
import {estiloDeLetra, colores} from '../../constantes/Temas';

const ProductListCart = ({carts, onGoToConfirm}) => {
  const renderCart = ({item: cart}) => <ProductCart cart={cart} />;

  return (
    <View style={style.mainContainer}>
      <View style={style.header}>
        <Text style={style.title}>Productos de cesta</Text>
        <View>
          <TouchableOpacity
            onPress={onGoToConfirm}
            style={style.button}
            delayPressIn={0}>
            <Text style={style.buttonText}>Ir a comprar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        contentContainerStyle={style.listContent}
        data={carts}
        scrollEventThrottle={16}
        renderItem={renderCart}
        keyExtractor={(cart) => cart.id.toString()}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: colores.blanco,
  },
  listContent: {
    paddingTop: 20,
    paddingLeft: 16,
    paddingBottom: 50,
    backgroundColor: colores.blanco,
  },
  header: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 10,
    marginBottom: 2,
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 1,
  },
  title: {
    marginTop: 5,
    ...estiloDeLetra.negrita,
    fontSize: 17,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 85,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    width: 120,
    marginTop: 8,
    padding: 10,
    alignItems: 'center',
    borderRadius: 290486,
    borderWidth: 1,
    borderColor: colores.dorado,
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  buttonText: {
    ...estiloDeLetra.negrita,
    color: colores.dorado,
    fontSize: 14,
  },
});

export default ProductListCart;
