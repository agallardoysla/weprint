import concat from 'lodash/concat';
export const AGREGAR_CART = 'AGREGAR_CART';
export const EDITAR_CART = 'EDITAR_CART';

export const agregarCart = (newCart) => ({
  type: AGREGAR_CART,
  payload: {
    newCart,
  },
});

export const editarCart = (editedCart, searchId) => ({
  type: EDITAR_CART,
  payload: {
    editedCart,
    searchId,
  },
});

const initialState = {
  data: [],
};

const editCart = (data, {editedCart, searchId}) => {
  const editedData = concat(data);
  const indexFound = editedData.findIndex((cart) => cart.id === searchId);
  editedData[indexFound] = editedCart;

  return editedData;
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case AGREGAR_CART:
      const {newCart} = payload;
      const dataAdded = [...state.data, newCart];

      return {
        ...state,
        data: dataAdded,
      };
    case EDITAR_CART:
      const editedData = editCart(state.data, payload);

      return {
        ...state,
        data: editedData,
      };
    default:
      return state;
  }
};
