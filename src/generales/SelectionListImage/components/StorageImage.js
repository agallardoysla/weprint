import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  useWindowDimensions,
} from 'react-native';
import Cargando from '../../Cargando';

import Icon from 'react-native-vector-icons/dist/Feather';
import isUndefined from 'lodash/isUndefined';
import {colores} from '../../../constantes/Temas';

const StorageImage = ({
  uri,
  isSelected,
  isPreSelected,
  hasMaxQuantity,
  onPressCheckImage,
}) => {
  const [check, setCheck] = useState(isSelected);
  const [preSelectedCheck, setPreSelectedCheck] = useState(false);
  const [loading, setLoading] = useState(true);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevState = usePrevious({check, isSelected});

  const handleRegularCheck = () => {
    const newCheck = !check;
    if (!newCheck || (!hasMaxQuantity && newCheck)) {
      setCheck(newCheck);
    } else {
      Alert.alert('Ya tiene el máximo de imágenes permitidas');
    }
  };

  const handlePreSelectCheck = () => {
    const newPreSelectedCheck = !preSelectedCheck;

    onPressCheckImage(uri, newPreSelectedCheck);
    setPreSelectedCheck(newPreSelectedCheck);
  };

  const handleOnPressImage = () => {
    if (isPreSelected) {
      handlePreSelectCheck();
    } else {
      handleRegularCheck();
    }
  };

  const handleOnLoadEndImage = () => setLoading(false);

  useEffect(() => {
    if (isUndefined(prevState)) {
      return;
    }

    if (prevState.isSelected !== isSelected && isSelected !== check) {
      setCheck(isSelected);
    }

    if (prevState.check !== check && check !== isSelected) {
      onPressCheckImage(uri, check);
    }
  }, [isSelected, check, uri, prevState, onPressCheckImage]);

  return (
    <TouchableWithoutFeedback delayPressIn={0} onPress={handleOnPressImage}>
      <View
        style={{
          ...style.mainContainer,
          width: useWindowDimensions().width / 3 - 8,
          height: useWindowDimensions().width / 3 + 1,
        }}>
        {loading && (
          <View style={style.loadingContainer}>
            <Cargando titulo="" loaderColor={colores.logo} />
          </View>
        )}
        <Image
          source={{uri}}
          style={style.image}
          resizeMode="cover"
          onLoadEnd={handleOnLoadEndImage}
        />
        {check || loading ? <View style={style.overlay} /> : null}
        {check && (
          <View style={style.checkContainer}>
            <Icon name="check" size={27} color={colores.blanco} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    marginHorizontal: 4,
    marginBottom: 15,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    elevation: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    elevation: 4,
  },
  checkContainer: {
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
});

export default StorageImage;
