### Getting started with react redux

#### Installing

"You'll also need to install Redux and set up a Redux store in your app."

```sh
npm install react-redux

```

### React Redux Quick Start

#### Usage Summary

##### Install Redux ToolKit And React Redux

```sh
npm i @reduxjs/toolkit react-redux
```

##### Create a Redux Store

```js
[app / store.js];

import { configureStore } from "@reduxjs/toolkit";
export default configureStore({
	reudcer: {},
});

// This creates a Redux store.
```

##### Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React Redux <Provider> around our application in src/index.js

```js
[index.js];

import store from "./app/store";
import { Provider } from "react-redux";

root.render(
	// Provider Component will provide the store for the whole childs
	<Provider store={store}>
		<App />
	</Provider>
);
```

##### Create a Redux State Slice

```js
[features / counter / counterSlice.js];

import { createSlice } from "@reduxjs/toolkit";

// createSlice function accepts three variables

createSlice({
	name: 'the name of the value',
	initialState: {
		value: '',
	},
	reducers: // the reducer Functions
})

export const counterSlice = createSlice({
	name: "counter",
	initialState: {
		value: 0,
	},
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// export the actions to use them in the parent component [Counter.jsx]


export default counterSlice.reducer;
// export the state [value] to use it in the store
```

##### Add Slice Reducers to the Store

Next, we need to import the reducer function from the counter slice and add it to our store.

```jsx
[app / store.jsx];

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export default configureStore({
	reducer: {
		counter: counterReducer,
		// By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.
	},
});
```

##### Use Redux State and Actions in React Components

Now we can use the React Redux hooks to let React components interact with the Redux store.

```jsx
[features / counter / Counter.jsx];

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

export function Counter() {
	const count = useSelector((state) => state.counter.value);
	// useSelector get the value that we are needing to display in the store.

	const dispatch = useDispatch();
	// useDispatch is used to the dispatch the action we need
	return (
		<div>
			<div>
				<button onClick={() => dispatch(increment())}>Increment</button>
				<span>{count}</span>
				<button onClick={() => dispatch(decrement())}>Decrement</button>
			</div>
		</div>
	);
}
```

Now, any time you click the "Increment" and "Decrement buttons:

- The corresponding Redux action will be dispatched to the store
- The counter slice reducer will see the actions and update its state
- The <code>Counter.jsx</code> component will see the new state value from the store and re-render itself with the new data

### Summary [steps]

#### Create a Redux store with configureStore

- Create a Redux store with configureStore
- configureStore automatically sets up the store with good default settings

#### Provide the Redux store to the React application components

- Put a React Redux < Provider> component around your < App />
- Pass the Redux store as < Provider store={store}>

#### Create a Redux "slice" reducer with createSlice

- Call createSlice with a string name, an initial state, and named reducer functions
- Export the generated slice reducer and action creators

#### Use the React Redux "useSelector/useDispatch" hooks in React components

- Read data from the store with the useSelector hook
- Get the dispatch function with the useDispatch hook, and dispatch actions as needed

<h3>asynchronous Actions</h3>

<h4>Creating the todosSlice</h4>

```jsx
["features/todosSlice.jsx"];

import { createSlice } from "@reduxjs/toolkit";
// initialize the state
const initialState = {
	loading: false,
	todos: [],
	error: "",
};
// create the usersSlice
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

// export the actions to use them in the fetchTodos funtion
export const { fetchTodosRequest, fetchTodosSuccess, fetchTodosFailed } =
	todosSlice.actions;
// export the reducer to use it in the store
export default todosSlice.reducer;
```

<h4>Define the fetchTodos</h4>

```jsx
["features/fetchTodos.jsx"];

// in this operation we are using axios
import axios from "axios";
//

// import he actions from the todosSlice
import {
	fetchTodosFailed,
	fetchTodosRequest,
	fetchTodosSuccess,
} from "./todosSlice";
//

export const fetchTodos = () => {
	return (dispatch) => {
		dispatch(fetchTodosRequest());
		axios
			.get("https://jsonplaceholder.typicode.com/todos")
			.then((response) => {
				const todos = response.data;
				// if the fetching succeed we send the data to the store
				dispatch(fetchTodosSuccess(todos));
			})
			.catch((error) => {
				// if the fetching failed we send the error message to the store
				dispatch(fetchTodosFailed(error.message));
			});
	};
};
```

<h4>Assing the reducer to the store</h4>

```jsx
["store.jsx"];

// external data
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import Logger from "redux-logger";
import ThunkMiddleware from "redux-thunk";

// Our data
import todosSlice from "./todosSlice";

export default configureStore(
	{
		reducer: {
			// set the reducer from the todosSlice in the store
			todosStore: todosSlice,
		},
	},
	applyMiddleware(Logger, ThunkMiddleware)
);
```

<h4>create the todos Components</h4>

```jsx
["app/Todos.jsx"];

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import fetchTodos from "../features/fetchTodos";

const Todos = () => {
	const todos = useSelector((state) => state.todosStore);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	// work with the store in all cases
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
```
