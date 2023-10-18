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

<h3>Working With RTK</h3>

<h4>Create a Redux Store</h4>

```js
[app / store.js];

import { configureStore } from "@reduxjs/toolkit";
export default configureStore({
	reudcer: {},
});

// This creates a Redux store.
```

<h4> Provide the Redux Store to React </h4>

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

<h4>Create a Redux State Slice</h4>

```jsx
["cake/features/cakeSlice.jsx"];

// import the createSlice to create the slice with it
import { createSlice } from "@reduxjs/toolkit";
///

const cakeSlice = createSlice({
	name: "cake", // name the slice
	initialState: {
		numOfCakes: 10, // set the intial state of the cakes
	},
	reducers: {
		buyCake: (state) => {
			state.numOfCakes -= 1; // edit the state
		},
	},
});
// export the actions to apply them in the CakeShop ['Cake.jsx']
export const { buyCake } = cakeSlice.actions;
///

// export the reducer to apply it in the store
export default cakeSlice.reducer;
///
```

<h4> Add Slice Reducers to the Store</h4>

```jsx
["store.jsx"];

import { configureStore } from "@reduxjs/toolkit";

import cakekReducer from "./cake/features/cakeSlice";
// this how we create the store in RTK
//
export default configureStore({
	/// export store to provide it from the main.jsx
	reducer: {
		cakeStore: cakekReducer, // the reducer that we export from cakeSlice
	},
});
///
```

<h4>Work with Cake.jsx</h4>

```jsx
["app/Cake.jsx"];

import { useDispatch, useSelector } from "react-redux";
import { buyCake } from "../features/cakeSlice";

const Cake = () => {
	// get the numOfCakes from the store
	const numOfCakes = useSelector((state) => state.cakeStore.numOfCakes);
	///
	const dispatch = useDispatch();
	return (
		<div>
			<h3>{numOfCakes}</h3>
			<button onClick={() => dispatch(buyCake())}>buy Cake</button>
		</div>
	);
};

export default Cake;
```

<h4> Summary [steps] </h4>

<h4>Create The store</h4>

- Create a Redux store with configureStore
- configureStore automatically sets up the store with good default settings

<h4>Provide the store to components</h4>

- Put a React Redux < Provider> component around your < App />
- Pass the Redux store as < Provider store={store}>

<h4>reate "slice"  with createSlice</h4>

- Call createSlice with a string name, an initial state, and named reducer functions
- Export the generated slice reducer and action creators

<h4>Use "useSelector/useDispatch" hooks in the components</h4>  

- Read data from the store with the useSelector hook
- Get the dispatch function with the useDispatch hook, and dispatch actions as needed


<h3>asyncActions in toolKit</h3>

<h4>define the fetchUsers function</h4>

```jsx
["features/getUsers.jsx"];

// createAsyncThunk is a best practice method we use instead of thunkMiddleware
import { createAsyncThunk } from "@reduxjs/toolkit";
/// target

const apiUrl = "https://jsonplaceholder.typicode.com/users";
// createAsyncThunk(typePrefix, payloadCreator)
export default createAsyncThunk("users/getUsers", async () => {
	/// syntax
	// fetching the data
	const response = await fetch(apiUrl);
	///
	try {
		const data = await response.json();
		return data;
	} catch (error) {
		// if there is any bug in fetching throw an error
		throw error;
		/// case
	}
});
```

<h4>slice Method</h4>

```jsx
["features/usersSlice.jsx"];

import { createSlice } from "@reduxjs/toolkit";

import getUsers from "./getUsers";

const initialState = {
	loading: false,
	users: [],
	error: "",
};

const usersSlice = createSlice({
	// this name will depending on to add the typePrefix
	name: "users",
	/// note:
	initialState, // Initialize the state
	// this reducer is made espicially to work with asyncActions
	extraReducers: (builder) => {
		/// idea:
		builder //
			// add & work with fetch cases
			.addCase(getUsers.pending, (state) => {
				state.loading = !state.loading;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = !state.loading;
				state.users = action.payload;
			}) // if success set users to the state
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = !state.loading;
				state.error = action.error.message;
			}); // if failed set message to the state
		/// what:
	},
});
// export the reducer to use it in the store
export default usersSlice.reducer;
// using
```

<h4>set the reducer to the store</h4>

```jsx
["store.jsx"];

import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/usersSlice";

export default configureStore({
	reducer: {
		usersStore: usersReducer,
	},
});
```

<h4>use the data in the component</h4>

```jsx
["app/Users.jsx"];

import { useEffect } from "react";
import getUsers from "../features/getUsers";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
	// useSelector to get data from the store
	const users = useSelector((state) => state.usersStore);
	/// why
	const dispatch = useDispatch();

	// use useEffect Hook to fetch the data only one time
	useEffect(() => {
		dispatch(getUsers());
	}, []);
	//
	// work with the data in each case we find
	return users.loading ? (
		<h4>Loading...</h4>
	) : users.error ? (
		<h4> {users.error} </h4>
	) : (
		<ul>
			{users.users.map((user) => (
				<li key={user.id}> {user.name} </li>
			))}
		</ul>
	);
	/// description:
};

export default Users;
```
