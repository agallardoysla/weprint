export const ACTUALIZAR_PROJECTS = 'ACTUALIZAR_PROJECTS';

export const actualizarRegister = (projects) => ({
  type: ACTUALIZAR_PROJECTS,
  projects,
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_PROJECTS:
      return {
        ...state,
        projects,
      };
    default:
      return state;
  }
};
