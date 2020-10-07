export const ACTUALIZAR_LAYOUT = 'ACTUALIZAR_LAYOUT';

export const actualizarLayout = (layouts) => ({
  type: ACTUALIZAR_LAYOUT,
  layouts,
});

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_LAYOUT:
      return {
        ...state,
        data: action.layouts,
      };
    default:
      return state;
  }
};
