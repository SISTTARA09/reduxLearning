import axios from "axios";
import {
	fetchTodosFailed,
	fetchTodosRequest,
	fetchTodosSuccess,
} from "./todosSlice";

export default () => {
	return (dispatch) => {
		dispatch(fetchTodosRequest());
		axios
			.get("https://jsonplaceholder.typicode.com/todos")
			.then((response) => {
				const todos = response.data;
				dispatch(fetchTodosSuccess(todos));
			})
			.catch((error) => {
				dispatch(fetchTodosFailed(error.message));
			});
	};
};
