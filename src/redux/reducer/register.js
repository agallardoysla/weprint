export const ACTUALIZAR_REGISTER = 'ACTUALIZAR_REGISTER';

export const actualizarRegister = (register) => ({
  type: ACTUALIZAR_REGISTER,
  register,
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_REGISTER:
      return {
        ...state,
        register: action.register,
      };
    default:
      return state;
  }
};
