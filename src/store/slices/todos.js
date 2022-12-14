import { createSlice } from "@reduxjs/toolkit";

const initialState = {todosArr : []};
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers : {
        add : (state, action) => {
            state.todosArr.push({id : Date.now(), title : action.payload, isDone : false});       
        },
        setIsDone : (state, action) => {
            state.todosArr.forEach(todo => todo.isDone = 
                todo.id === action.payload ? !todo.isDone : todo.isDone,       
            )      
        },
        remove : (state, action) => {
            state.todosArr = state.todosArr.filter(todo => todo.id !== action.payload);
       },
    },
});

const { reducer, actions : { add, setIsDone, remove}} = todosSlice;

export { add, setIsDone, remove};
export default reducer;