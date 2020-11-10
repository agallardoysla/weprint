import concat from 'lodash/concat';
export const AGREGAR_CART = 'AGREGAR_CART';
export const EDITAR_CART = 'EDITAR_CART';
export const SET_LIST_CART = 'SET_LIST_CART';
export const CART_HAS_LOCAL_CHANGES = 'CART_HAS_LOCAL_CHANGES';

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

export const setListCart = (carts) => ({
  type: SET_LIST_CART,
  payload: {
    carts,
  },
});

export const cartHasLocalChange = (status) => ({
  type: CART_HAS_LOCAL_CHANGES,
  payload: {
    status,
  },
});

const initialState = {
  hasLocalChange: false,
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
    case SET_LIST_CART:
      const {carts} = payload;

      return {
        ...state,
        data: carts,
      };
    case CART_HAS_LOCAL_CHANGES:
      const {status} = payload;

      return {
        ...state,
        hasLocalChange: status,
      };
    default:
      return state;
  }
};
