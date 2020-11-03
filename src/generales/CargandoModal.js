import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Cargando from './Cargando';
import {colores, tipoDeLetra} from '../constantes/Temas';

const CargandoModal = ({style, title, show, transparentBackground = true}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={show}>
      <View style={[styles.container, {backgroundColor: transparentBackground === true ? colores.cargandoModalFondo : colores.cargandoModal}, style]}>
        <View style={{padding: 30, backgroundColor: colores.cargandoModal}}>
          <Cargando
            titulo={title}
            loaderColor={colores.loader}
            style={{flexDirection: 'row'}}
            tituloStyle={{
              marginHorizontal: 20,
              fontSize: RFPercentage(2),
              color: colores.blanco,
              fontWeight: 'bold',
              fontFamily: tipoDeLetra.bold,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CargandoModal;
