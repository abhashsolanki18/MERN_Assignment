
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  images: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
