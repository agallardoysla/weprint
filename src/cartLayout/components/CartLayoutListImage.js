import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import CartLayoutCover from './CartLayoutCover';
import CartLayoutImage from './CartLayoutImage';

const CartLayoutListImage = ({preSelectedCart, onGoToEditCartImage}) => {
  const renderPages = ({item: page}) => (
    <CartLayoutImage page={page} onGoToEditCartImage={onGoToEditCartImage} />
  );

  return (
    <FlatList
      contentContainerStyle={style.listContainer}
      ListHeaderComponent={
        <CartLayoutCover uri={preSelectedCart.pages[0].pieces[0].file} />
      }
      data={preSelectedCart.pages}
      numColumns={2}
      renderItem={renderPages}
      keyExtractor={(page) => page.number.toString()}
    />
  );
};

const style = StyleSheet.create({
  listContainer: {
    marginTop: 35,
    paddingTop: 5,
    paddingHorizontal: 8,
  },
});

export default CartLayoutListImage;
