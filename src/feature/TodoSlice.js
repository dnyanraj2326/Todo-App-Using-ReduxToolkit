import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export let TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        isComplet: false,
      };
      state.todos.push(todo);
    },
    complet: (state, action) => {
      state.todos = state.todos.map(prevTodo =>
        prevTodo.id == action.payload
          ? {...prevTodo, isComplet: !prevTodo.isComplet}
          : prevTodo,
      );
    },
    removeTodo: (state, action) => {
      state.todos = state.todos?.filter(todo => todo.id !== action.payload);
    },
    editTodo:(state,action) => {
        state.todos = state.todos.map((todo) => todo.id == action.payload.id ? {...todo,text:action.payload.text}:todo)
    }
  },
});

export const {addTodo, complet, removeTodo, editTodo} = TodoSlice.actions;
export default TodoSlice.reducer;
