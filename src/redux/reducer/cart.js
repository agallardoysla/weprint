export const AGREGAR_CART_PRESELECCIONADO = 'AGREGAR_CART_PRESELECCIONADO';

export const agregarCartPreseleccionado = (customId, cart) => ({
  type: AGREGAR_CART_PRESELECCIONADO,
  payload: {
    customId,
    cart,
  },
});

const initialState = {
  shortlisted: {},
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case AGREGAR_CART_PRESELECCIONADO:
      const {customId, cart} = payload;

      return {
        ...state,
        shortlisted: {
          ...state.shortlisted,
          [customId]: {
            ...cart,
          },
        },
      };
    default:
      return state;
  }
};
