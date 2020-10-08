export const ACTUALIZAR_IMAGENES = 'ACTUALIZAR_IMAGENES';

export const actualizarImagenes = (customId, images) => ({
  type: ACTUALIZAR_IMAGENES,
  payload: {
    customId,
    images,
  },
});

const initialState = {
  preSelectedImages: {},
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ACTUALIZAR_IMAGENES:
      const {customId, images} = payload;

      return {
        ...state,
        preSelectedImages: {
          ...state.preSelectedImages,
          [customId]: images,
        },
      };

    default:
      return state;
  }
};
