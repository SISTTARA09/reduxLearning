import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import fetchTodos from "../features/fetchTodos";

const Todos = () => {
	const todos = useSelector((state) => state.todosStore);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	// console.log(filtredTodos);

	return todos.loading ? (
		<h4>Loading...</h4>
	) : todos.error ? (
		<h4> {todos.error} </h4>
	) : (
		<ul>
			{todos.todos
				.filter((todo) => todo.completed)
				.map((todo) => (
					<li key={todo.id}> {todo.title} </li>
				))}
		</ul>
	);
};

export default Todos;
