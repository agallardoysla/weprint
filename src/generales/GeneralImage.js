import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Cargando from './Cargando';
import {colores} from '../constantes/Temas';

const GeneralImage = ({styleImg, uri, base64, resizeMode}) => {
  const defaultImg = require('../assets/img/default.jpg');

  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(uri ? {uri} : defaultImg);

  const handleLoadEnd = () => setLoading(false);

  const handleOnError = (e) => {
    if (e.nativeEvent.error && base64) {
      setLoading(true);
      setSource({uri: `data:image/gif;base64,${base64}`});
    } else {
      setSource(defaultImg);
    }
  };

  useEffect(() => {
    setSource(uri ? {uri} : defaultImg);
  }, [uri]);

  return (
    <View style={style.wrapper}>
      {loading && (
        <View style={style.wrapperLoading}>
          <Cargando titulo="" loaderColor={colores.logo} />
        </View>
      )}
      <Image
        style={styleImg}
        source={source}
        resizeMode={resizeMode}
        onLoadEnd={handleLoadEnd}
        onError={handleOnError}
      />
    </View>
  );
};

GeneralImage.defaultProps = {
  resizeMode: 'cover',
};

const style = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  wrapperLoading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default GeneralImage;
