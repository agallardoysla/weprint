export const AGREGAR_CART = 'AGREGAR_CART';

export const agregarCart = (cart) => ({
  type: AGREGAR_CART,
  payload: {
    cart,
  },
});

const initialState = {
  list: {},
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case AGREGAR_CART:
      const {cart} = payload;

      return {
        ...state,
        list: {
          ...state.list,
          [cart.id]: {
            ...cart,
          },
        },
      };
    default:
      return state;
  }
};
