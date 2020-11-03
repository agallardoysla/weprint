import concat from 'lodash/concat';
export const ACTUALIZAR_FORMAT = 'ACTUALIZAR_FORMAT ';

export const actualizarFormats = (formats) => ({
  type: ACTUALIZAR_FORMAT,
  formats,
});

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_FORMAT:
      const data = concat(state.data, action.formats);

      return {
        ...state,
        data,
      };
    default:
      return state;
  }
};
