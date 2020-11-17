export const ACTUALIZAR_NAVIGATION = 'ACTUALIZAR_NAVIGATION';

export const actualizarNavigation = (navigation) => ({
  type: ACTUALIZAR_NAVIGATION,
  navigation,
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_NAVIGATION:
      return {
        ...state,
        navigation: action.navigation,
      };
    default:
      return state;
  }
};
