import React, {PureComponent} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Cargando from '../../Cargando';
import Icon from 'react-native-vector-icons/dist/Feather';
import {colores} from '../../../constantes/Temas';

class ImagenItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      check: props.isSelected,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {isSelected, node, onPressCheckImage} = this.props;
    const {check} = this.state;

    if (prevProps.isSelected !== isSelected && isSelected !== check) {
      this.setState({...this.state, check: isSelected});
    }

    if (prevState.check !== check && check !== isSelected) {
      onPressCheckImage(node, check);
    }
  }

  handleOnLoadEndImage = () => this.setState({...this.state, loading: false});

  handleOnPressSelectImage = () => {
    const {hasMaxQuantity} = this.props;
    const check = !this.state.check;

    if (!check || (!hasMaxQuantity && check)) {
      this.setState({...this.state, check});
    }
  };

  render() {
    const {loading, check} = this.state;
    const {node} = this.props;

    return (
      <TouchableOpacity onPress={this.handleOnPressSelectImage}>
        <View
          style={{
            ...style.imagenItemMainContainer,
            width: Dimensions.get('window').width / 3 - 8,
          }}>
          {loading && (
            <View style={style.imagenItemLoadingContainer}>
              <Cargando titulo="" loaderColor={colores.logo} />
            </View>
          )}

          <Image
            source={{uri: node.image.uri}}
            style={style.imagenItem}
            resizeMode="cover"
            onLoadEnd={this.handleOnLoadEndImage}
          />
          {check || loading ? <View style={style.imagenItemOverlay} /> : null}
          {check && (
            <View style={style.imagenItemCheckContainer}>
              <Icon name="check" size={27} color={colores.blanco} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  imagenItemMainContainer: {
    position: 'relative',
    height: 110,
    marginHorizontal: 4,
    marginBottom: 15,
  },
  imagenItemOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    elevation: 0,
  },
  imagenItemCheckContainer: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colores.logo,
    lineHeight: 15,
  },
  imagenItem: {
    height: '100%',
    width: '100%',
  },
  imagenItemLoadingContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    elevation: 4,
  },
});

export default ImagenItem;
