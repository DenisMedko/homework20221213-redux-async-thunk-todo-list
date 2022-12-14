import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todos';
import themesReducer from './slices/themes';

const store = configureStore({
    reducer : {
        todos : todosReducer,
        theme : themesReducer,
    },
});

export default store;