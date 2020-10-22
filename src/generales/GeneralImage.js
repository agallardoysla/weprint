import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Cargando from './Cargando';
import {colores} from '../constantes/Temas';

const GeneralImage = ({styleImg, uri, base64}) => {
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState({uri});
  const defaultImg = require('../assets/img/default.jpg');

  const handleLoadEnd = () => setLoading(false);

  const handleOnError = (e) => {
    if (e.nativeEvent.error && base64) {
      setLoading(true);
      setSource({uri: `data:image/gif;base64,${base64}`});
    }
  };

  useEffect(() => {
    setSource({uri});
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
        defaultSource={defaultImg}
        resizeMode="cover"
        onLoadEnd={handleLoadEnd}
        onError={handleOnError}
      />
    </View>
  );
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
