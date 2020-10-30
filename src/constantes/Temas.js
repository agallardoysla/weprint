/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';

export const colores = {
  fondo: '#e1e8f4',
  verde: '#00855a',
  rojo: '#c00525',
  cuidado: '#4DACC5',
  farmacia: '#C73634',
  mercado: '#A2C037',
  agregar: '#DA9A0F',
  modcantidad: '#A7AFC5',
  masmenos: '#71788D',
  verCanasta: '#273791',
  naranja: '#E1B100',
  dorado: '#E1B100',
  gratis: '#c00525',
  blanco: '#FFFFFF',
  transparente: 'rgba(0,0,0,0)',
  gris: '#a2a4ab',
  loader: '#f18263',
  menuSelect: '#666666',
  grisFormatoAlbum: '#737373',
  grisClaro: '#e5e6e8',
  grisBgIconCart: '#f6f8fa',
  grisWrapperImage: '#9b9b9b',
  grisWrapperEmptyImage: '#f8f8f8',
  grisLetter: '#616161',
  azulNoche: '#051441',
  azulMedio: '#3987B5',
  logo: '#f98364',
  negro: 'black',
  negroMedio: '#333',
  lila: '#7474f9',
};

export const tipoDeLetra = {
  bold: 'RobotoBold',
  medium: 'RobotoMedium',
  italic: 'RobotoItalic',
  regular: 'RobotoMedium',
};

export const opacidades = {
  bordesInputs: 'rgba(52,52,52,0.6)',
  vacio: 'rgba(52,52,52,0.4)',
  vacioGrave: 'rgba(52,52,52,0.9)',
  verCanasta: 'rgba(78,69,142,0.5)',
};
export const tamañoLetra = {
  terminos: 2.2,
  tituloContainer: 2.5,
  subtituloContainer: 25.5,
  botones: 2.5,
};
export const pantalla = {
  screenHeight: Math.round(Dimensions.get('window').height),
  screenWidth: Math.round(Dimensions.get('window').screenWidth),
};

export const estiloDeLetra = {
  negrita: {
    color: '#000000',
    fontFamily: tipoDeLetra.bold,
    fontWeight: 'bold',
  },
};
