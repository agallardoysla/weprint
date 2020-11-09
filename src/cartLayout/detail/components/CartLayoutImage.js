import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import CartLayoutWrapper from './CartLayoutWrapper';
import CartDeleteItemModal from './CartDeleteItemModal';
import CartLayoutWhitePage from './CartLayoutWhitePage';

class CartLayoutImage extends PureComponent {
  state = {
    showModal: false,
  };

  handleOnPressImage = () => {
    const {page, onGoToEditCartImage} = this.props;

    onGoToEditCartImage(page);
  };

  handleToggleModal = () => {
    this.setState({...this.state, showModal: !this.state.showModal});
  };

  handleOnPressDelete = () => {
    const {page, onDeletePage} = this.props;

    this.handleToggleModal();
    onDeletePage(page.number);
  };

  pageIsOdd() {
    const {page} = this.props;
    return page.number % 2 !== 0;
  }

  render() {
    const {
      page,
      panResponder,
      onRowHeight,
      onSelectPieceItem,
      onResetPieceItem,
    } = this.props;
    const {showModal} = this.state;

    return (
      <>
        <CartDeleteItemModal
          showModal={showModal}
          onPressDelete={this.handleOnPressDelete}
          onToggleModal={this.handleToggleModal}
        />
        {page.number === 0 ? (
          <CartLayoutWhitePage title="Portada interior" />
        ) : (
          <View
            style={style.cartLayoutImageMainContainer}
            onLayout={onRowHeight}>
            <View style={style.cartLayoutImageBg}>
              <CartLayoutWrapper
                panResponder={panResponder}
                page={page}
                onSelectPieceItem={onSelectPieceItem}
                onPressImage={this.handleOnPressImage}
              />
            </View>
            <Text style={style.cartLayoutText}>Pg {page.number}</Text>
            <View
              nativeID={page.number.toString()}
              style={
                this.pageIsOdd()
                  ? style.cartLayoutIconContainerRight
                  : style.cartLayoutIconContainer
              }
              {...panResponder.panHandlers}
              onResponderStart={onResetPieceItem}>
              <Icon name="move" size={15} color={colores.gris} />
            </View>
            <TouchableHighlight
              underlayColor={colores.blanco}
              onPress={this.handleToggleModal}
              style={
                this.pageIsOdd()
                  ? style.cartLayoutIconContainerXRight
                  : style.cartLayoutIconContainerX
              }>
              <Icon name="x" size={15} color={colores.rojo} />
            </TouchableHighlight>
          </View>
        )}
      </>
    );
  }
}

const style = StyleSheet.create({
  cartLayoutImageMainContainer: {
    position: 'relative',
    height: 150,
    width: '50%',
    backgroundColor: colores.grisWrapperEmptyImage,
  },
  cartLayoutImageBg: {
    height: 110,
    width: '100%',
    paddingLeft: 5,
    paddingBottom: 5,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
  },
  cartLayoutIconContainer: {
    position: 'absolute',
    top: 92,
    left: 0,
    height: 18,
    width: 27,
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 1,
  },
  cartLayoutIconContainerRight: {
    position: 'absolute',
    top: 92,
    right: 0,
    height: 18,
    width: 27,
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 1,
  },
  cartLayoutIconContainerX: {
    position: 'absolute',
    top: -5,
    left: 0,
    height: 18,
    width: 27,
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 999,
    zIndex: 999,
  },
  cartLayoutIconContainerXRight: {
    position: 'absolute',
    top: -5,
    right: 0,
    height: 18,
    width: 27,
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.grisBgIconCart,
    borderWidth: 0.5,
    borderColor: colores.grisFormatoAlbum,
    elevation: 999,
    zIndex: 999,
  },
  cartLayoutText: {
    marginTop: 5,
    marginBottom: 30,
    color: colores.gris,
    fontWeight: '700',
    fontFamily: tipoDeLetra.bold,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CartLayoutImage;
