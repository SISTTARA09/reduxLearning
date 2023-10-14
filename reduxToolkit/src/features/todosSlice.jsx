import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	loading: false,
	todos: [],
	error: "",
};
const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		fetchTodosRequest: (state) => {
			return {
				...state,
				loading: true,
			};
		},
		fetchTodosSuccess: (state, action) => {
			return {
				loading: false,
				todos: action.payload,
				error: "",
			};
		},
		fetchTodosFailed: (state, action) => {
			return {
				loading: false,
				error: action.payload,
				todos: [],
			};
		},
	},
});

export const { fetchTodosRequest, fetchTodosSuccess, fetchTodosFailed } =
	todosSlice.actions;

export default todosSlice.reducer;
