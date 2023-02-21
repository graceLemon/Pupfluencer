import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContent from '../modules/addContentSlice';
import todos from '../modules/todoSlice';

const store = configureStore({
  reducer: {
    login,
    addContent,
    todos,
  },
});

export default store;
