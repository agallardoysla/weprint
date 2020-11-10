export const ACTUALIZAR_LOGIN = 'ACTUALIZAR_LOGIN';
export const CERRAR_SESION = 'CERRAR_SESION';

export const actualizarLogin = (login) => ({
  type: ACTUALIZAR_LOGIN,
  login,
});

export const logout = (login) => ({
  type: CERRAR_SESION,
  login,
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_LOGIN:
      return {
        ...state,
        login: true,
      };
    default:
      return state;
  }
};
