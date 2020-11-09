import concat from 'lodash/concat';
export const ACTUALIZAR_FORMAT = 'ACTUALIZAR_FORMAT ';
export const AGREGAR_FORMAT = 'AGREGAR_FORMAT';

export const actualizarFormats = (formats) => ({
  type: ACTUALIZAR_FORMAT,
  payload: {
    formats,
  },
});

export const agregarFormat = (format) => ({
  type: AGREGAR_FORMAT,
  payload: {
    format,
  },
});

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ACTUALIZAR_FORMAT:
      const {formats} = payload;
      const data = concat(state.data, formats);

      return {
        ...state,
        data,
      };

    case AGREGAR_FORMAT:
      const {format} = payload;
      const formatAdded = [...state.data, format];

      return {
        ...state,
        data: formatAdded,
      };

    default:
      return state;
  }
};
