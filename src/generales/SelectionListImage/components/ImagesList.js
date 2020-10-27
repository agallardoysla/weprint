import React, {PureComponent, useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import CameraRoll from '@react-native-community/cameraroll';
import {colores, tipoDeLetra} from '../../../constantes/Temas';
import Cargando from '../../Cargando';
import ImageItem from './ImageItem';
import Icon from 'react-native-vector-icons/dist/Feather';

class ImagesList extends PureComponent {
  state = {
    edges: [],
    pageInfo: {
      hasNextPage: true,
      after: '0',
    },
    loading: false,
    loadingAll: false,
    selectAll: false,
  };

  loadImages = async () => {
    const {albumTitle} = this.props;
    const {edges, pageInfo, loading} = this.state;

    if (pageInfo.hasNextPage && !loading) {
      this.setState({...this.state, loading: true});

      const photos = await CameraRoll.getPhotos({
        assetType: 'Photos',
        first: 24,
        after: pageInfo.after,
        groupName: albumTitle,
        include: ['filename'],
      });

      const data = concat(edges, photos.edges);

      const nextPageInfo = {
        after: photos.page_info.end_cursor,
        hasNextPage: photos.page_info.has_next_page,
      };

      this.setState({
        ...this.state,
        loading: false,
        edges: data,
        pageInfo: nextPageInfo,
      });
    }
  };

  getNodesFromEdges = () => this.state.edges.map((edge) => edge.node);

  handleSelectedAll = () => {
    const {selectedImages, albumTitle} = this.props;

    const selectAll = selectedImages.some(
      (selectedImage) => selectedImage.node.group_name === albumTitle,
    );

    this.setState({...this.state, selectAll});
  };

  async componentDidMount() {
    await this.loadImages();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.edges !== this.props.edges) {
      this.handleSelectedAll();
    }
  }

  handleAddImage = (node) => {
    const {selectedImages, onSelectImages} = this.props;
    const images = concat(selectedImages, [{uri: node.image.uri, node}]);
    onSelectImages(images);
  };

  handleRemoveImage = (node) => {
    const {selectedImages, onSelectImages} = this.props;
    const imagesReverse = concat(selectedImages).reverse();
    const indexDelete = imagesReverse.findIndex(
      (imageReverse) => imageReverse.uri === node.image.uri,
    );

    const images = imagesReverse
      .filter((_, index) => index !== indexDelete)
      .reverse();

    onSelectImages(images);
  };

  handleOnPressCheckImage = (node, isCheck) => {
    if (isCheck) {
      this.handleAddImage(node);
    } else {
      this.handleRemoveImage(node);
    }
  };

  onSelectAll = () => {
    const {selectedImages, minQuantity, onSelectImages} = this.props;
    const offset = minQuantity - selectedImages.length;
    const nodes = this.getNodesFromEdges().slice(0, offset);

    const imagesFromAlbum = nodes.map((node) => ({
      node,
      uri: node.image.uri,
    }));

    const images = concat(selectedImages, imagesFromAlbum);

    onSelectImages(uniq(images));
  };

  onDeselectAll = () => {
    const {selectedImages, onSelectImages, albumTitle} = this.props;
    const images = selectedImages.filter(
      (selectedImage) => selectedImage.node.group_name !== albumTitle,
    );

    onSelectImages(images);
  };

  handleOnPressSelectAll = () => {
    const {selectAll} = this.state;

    if (selectAll) {
      this.onDeselectAll();
    } else {
      this.onSelectAll();
    }
  };

  handleImageIsSelected = (uri) => {
    const {selectedImages} = this.props;
    return selectedImages.some((selectedImage) => selectedImage.uri === uri);
  };

  handleImageIsPreselected = (uri) => {
    const {preSelectedImages} = this.props;
    return preSelectedImages.some(
      (preselectImage) => preselectImage.uri === uri,
    );
  };

  showButtonAll = () => {
    const {maxQuantity, preSelectedImages} = this.props;

    return maxQuantity === 0 && preSelectedImages.length === 0;
  };

  disabledButtonAll = () => {
    const {minQuantity, selectedImages} = this.props;
    const {selectAll} = this.state;

    return selectedImages.length >= minQuantity && !selectAll;
  };

  renderImage = ({item: edge}) => {
    const {hasMaxQuantity} = this.props;
    const {node} = edge;
    const {
      image: {uri},
    } = node;

    const isPreselected = this.handleImageIsPreselected(uri);
    const isSelected = isPreselected || this.handleImageIsSelected(uri);

    return (
      <ImageItem
        node={node}
        isPreselected={isPreselected}
        isSelected={isSelected}
        hasMaxQuantity={hasMaxQuantity}
        onPressCheckImage={this.handleOnPressCheckImage}
      />
    );
  };

  renderFooter = () =>
    this.state.loading ? (
      <Cargando titulo="" loaderColor={colores.logo} />
    ) : null;

  render() {
    const {
      albumTitle,
      minQuantity,
      hasMaxQuantity,
      selectedImages,
      onPressGoToAlbum,
    } = this.props;

    const {edges, selectAll} = this.state;

    return (
      <View style={style.imagesListMainContainer}>
        <TouchableOpacity
          style={style.imagesListHeader}
          onPress={onPressGoToAlbum}>
          <Icon name="arrow-left" size={27} color={colores.negro} />
          <View style={style.imagesListHeaderTextContainer}>
            <View>
              <Text style={style.imagesListHeaderText}> Imágenes</Text>
            </View>
            {minQuantity > 0 && (
              <View>
                <Text style={style.imagesListHeaderText}>
                  {selectedImages.length}/{minQuantity}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {edges.length > 0 && (
          <View style={style.imageListButtonContainer}>
            <View>
              <Text style={style.imagesListAlbumText}>{albumTitle}</Text>
            </View>
            {this.showButtonAll() && (
              <TouchableHighlight
                disabled={this.disabledButtonAll()}
                style={{
                  ...style.imagesListButton,
                  opacity: this.disabledButtonAll() ? 0.5 : 1,
                }}
                onPress={this.handleOnPressSelectAll}
                underlayColor={colores.blanco}>
                <Text style={style.imagesListButtonText}>
                  {selectAll ? 'Deseleccionar' : 'Seleccionar todo'}
                </Text>
              </TouchableHighlight>
            )}
          </View>
        )}

        <View>
          <FlatList
            style={style.imagesListContainer}
            data={edges}
            numColumns={3}
            renderItem={this.renderImage}
            hasMaxQuantity={hasMaxQuantity}
            keyExtractor={(edge) => edge.node.image.uri}
            onEndReachedThreshold={0.4}
            onEndReached={this.loadImages}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  imagesListMainContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    paddingBottom: 100,
  },
  imagesListHeader: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  imagesListHeaderText: {
    color: colores.negro,
    fontFamily: tipoDeLetra.bold,
    fontSize: 19,
  },
  imagesListHeaderTextContainer: {
    flexGrow: 1,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingBottom: 0.5,
  },
  imageListButtonContainer: {
    marginTop: 18,
    paddingLeft: 14,
    paddingRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imagesListButton: {
    marginTop: 3,
    width: 120,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 290486,
    borderColor: colores.logo,
    backgroundColor: colores.blanco,
  },
  imagesListButtonText: {
    color: colores.logo,
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  imagesListContainer: {
    marginTop: 20,
  },
  imagesListContent: {
    paddingVertical: 10,
  },
  imagesListAlbumText: {
    fontFamily: tipoDeLetra.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.negro,
  },
});

export default ImagesList;
