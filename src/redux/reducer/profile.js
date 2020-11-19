export const ACTUALIZAR_PROFILE = 'ACTUALIZAR_PROFILE';

export const actualizarProfile = (data) => ({
  type: ACTUALIZAR_PROFILE,
  payload: {
    data,
  },
});

const initialState = {data: null};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ACTUALIZAR_PROFILE:
      const {data} = payload;

      return {
        ...state,
        data,
      };
    default:
      return state;
  }
};
