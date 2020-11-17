import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import ProductCart from './ProductCart';
import {estiloDeLetra, colores} from '../../constantes/Temas';

const ProductListCart = ({carts, onGoToConfirm}) => {
  const renderCart = ({item: cart}) => <ProductCart cart={cart} />;

  return (
    <View style={style.mainContainer}>
      <View style={style.header}>
        <Text style={style.title}>Productos de cesta</Text>
        <TouchableHighlight
          onPress={onGoToConfirm}
          style={style.button}
          underlayColor="rgba(0, 0, 0, 0.1)"
          delayLongPress={0}>
          <Text style={style.buttonText}>Ir a comprar</Text>
        </TouchableHighlight>
      </View>
      <FlatList
        contentContainerStyle={style.listContent}
        data={carts}
        renderItem={renderCart}
        keyExtractor={(cart) => cart.id.toString()}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: colores.blanco,
  },
  listContent: {
    paddingLeft: 16,
    paddingBottom: 50,
    backgroundColor: colores.blanco,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    marginTop: 5,
    ...estiloDeLetra.negrita,
    fontSize: 18,
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
    paddingVertical: 5,
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
