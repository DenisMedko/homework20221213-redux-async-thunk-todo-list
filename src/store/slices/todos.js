import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from '../../api';

const SLICE_NAME = 'todos';

const getOnServer = createAsyncThunk(
  `${SLICE_NAME}/getOnServer`,
  async (arg, thunkAPI) => {
    try {
        const { 
            data: { data: todos }, 
        } = await API.getOnServer(arg);
        return todos;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const addOnServer = createAsyncThunk(
    `${SLICE_NAME}/addOnServer`,
    async (todoText, thunkAPI) => {
        try {
            const {
                data: { data: todo },
            } = await API.addOnServer({text : todoText});
            return todo;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

const removeOnServer = createAsyncThunk(
    `${SLICE_NAME}/removeOnServer`,
    async (id, thunkAPI) => {
        try {
            const {
                data: { data: deletedId },
            } = await API.removeOnServer(id);
            return deletedId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

const changeOnServer = createAsyncThunk(
    `${SLICE_NAME}/changeOnServer`,
    async (todo, thunkAPI) => {
        try {
            const {
                data: { data: changedTodo },
            } = await API.changeOnServer(todo.id, { text: todo.text , isDone : !todo.isDone });
            return changedTodo;
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
        // id must be setted by Server only
        setIsDone : (state, action) => {
            const todo = state.todosArr[action.payload];
            todo.isDone = !todo.isDone;    
        },
        remove : (state, action) => {
            state.todosArr = state.todosArr.filter(todo => todo.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        //getTodos
        builder.addCase(getOnServer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getOnServer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todosArr = action.payload; 
        });
        builder.addCase(getOnServer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
        });
        //addTodo
        builder.addCase(addOnServer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addOnServer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todosArr.push(action.payload);
        });
        builder.addCase(addOnServer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
        });
        //deleteTodo
        builder.addCase(removeOnServer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeOnServer.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(removeOnServer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
        });
        //changeTodo
        builder.addCase(changeOnServer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(changeOnServer.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(changeOnServer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
        });
    },  
});

const { reducer, actions : { setIsDone, remove }} = todosSlice;

export { setIsDone, remove, addOnServer, changeOnServer, getOnServer, removeOnServer };
export default reducer;

