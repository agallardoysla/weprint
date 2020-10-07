export const ACTUALIZAR_IMAGENES_SELECCIONADAS =
  'ACTUALIZAR_IMAGENES_SELECCIONADAS';

export const actualizarImagenesSeleccionadas = (customId, images) => ({
  type: ACTUALIZAR_IMAGENES_SELECCIONADAS,
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
    case ACTUALIZAR_IMAGENES_SELECCIONADAS:
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
