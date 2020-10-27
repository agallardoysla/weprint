import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {colores, tipoDeLetra} from '../../constantes/Temas';
import Icon from 'react-native-vector-icons/dist/Feather';
import CartLayoutWrapper from './CartLayoutWrapper';

class CartLayoutImage extends PureComponent {
  state = {
    showModal: false,
  };

  handleOnPressImage = (e) => {
    e.stopPropagation();
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
        <Modal transparent={true} animationType="fade" visible={showModal}>
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>¿Eliminar el artículo?</Text>
              <Text style={style.modalSecondTitle}>
                ¿Estás seguro que quieres eliminar esto?
              </Text>

              <View style={style.modalOptionsContainer}>
                <TouchableOpacity
                  onPress={this.handleToggleModal}
                  style={{
                    ...style.modalOptionItem,
                    borderRightWidth: 0.5,
                    borderRightColor: colores.grisFormatoAlbum,
                    borderBottomLeftRadius: 5,
                  }}>
                  <Text style={{color: colores.azulMedio}}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...style.modalOptionItem, borderBottomRightRadius: 5}}
                  onPress={this.handleOnPressDelete}>
                  <Text style={{color: colores.rojo}}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={style.cartLayoutImageMainContainer} onLayout={onRowHeight}>
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
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    marginHorizontal: '20%',
    borderRadius: 5,
    backgroundColor: colores.blanco,
    elevation: 1,
  },
  modalTitle: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSecondTitle: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: tipoDeLetra.regular,
    textAlign: 'center',
  },
  modalOptionsContainer: {
    flexDirection: 'row',
    marginTop: 18,
    borderTopColor: colores.grisFormatoAlbum,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 0.5,
  },
  modalOptionItem: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blanco,
  },
});

export default CartLayoutImage;
