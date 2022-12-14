import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from '../../api';

const SLICE_NAME = 'todos';

const getTodos = createAsyncThunk(
  `${SLICE_NAME}/getTodos`,
  async (arg, thunkAPI) => {
    try {
      //console.log(`arg is ${arg}`);
      const { 
            data: { data: todos }, 
        } = await API.getTodos(arg);
      return todos;
    } catch (error) {
      //console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const add = createAsyncThunk(
`${SLICE_NAME}/addTodo`,
async (todoText, thunkAPI) => {
    try {
    const {
        data: { data: todo },
    } = await API.addTodo({text : todoText});
    return todo;
    } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
    }
}
);

const initialState = {
    todosArr : [],
    isLoading: false,
    error: null,
};
const todosSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers : {
        // add : (state, action) => {
        //     //state.todosArr.push({id : Date.now(), title : action.payload, isDone : false});       
        // },
        setIsDone : (state, action) => {
            state.todosArr.forEach(todo => todo.isDone = 
                todo.id === action.payload ? !todo.isDone : todo.isDone,       
            )      
        },
        remove : (state, action) => {
            state.todosArr = state.todosArr.filter(todo => todo.id !== action.payload);
       },
    },
    extraReducers: (builder) => {
        //getTodos
        builder.addCase(getTodos.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todosArr = action.payload; 
        });
        builder.addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
        });
        //addTodo
        builder.addCase(add.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(add.fulfilled, (state, action) => {
            state.isLoading = false;
            const {id, text, isDone} = action.payload;
            state.todosArr.push( {id, text , isDone} );
        });
        builder.addCase(add.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
        });
    },
    
});

const { reducer, actions : { /*add,*/ setIsDone, remove}} = todosSlice;

export { add, setIsDone, remove, getTodos};
export default reducer;

