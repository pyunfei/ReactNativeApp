/* eslint-disable prettier/prettier */
import produce from 'immer';

const initState = {
  demo: [],
  color: null,
};
const reducer = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        break;
    }
  });


export default reducer;
