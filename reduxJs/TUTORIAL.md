### Getting Started With Pain-Redux

<p>let's take an example of a cake & iceCream store</p>

<h4>Install Redux Library</h4>

```sh

npm i redux
```

<h4>import Redux </h4>

```js
[index.js];

const redux = require("redux");
```

<h4>create the store</h4>

```js
[index.js];

// To Create The Store We Have To Imort The createStore Method to do
const createStore = redux.createStore;
```

<h4>Define the actions</h4>

```js
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
```

<h4>Define Actions Creators</h4>

```js
const buyCake = () => {
	return {
		type: BUY_CAKE,
		info: "...",
	};
};

const buyIceCream = () => {
	return {
		type: BUY_ICECREAM,
		info: "...",
	};
};
```

<h4>Initials The State Of The Store</h4>

<p>for best practice define each initialstate alone</p>

```js
const initialCakeStore = {
	numberOfCakes: 10,
};
const initialIceCreamStore = {
	numberOfIceCreams: 15,
};
```

<h4>The Reducer Functions</h4>

```js
const cakeRducer = (state = initialCakeStore, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				...state,
				numberOfCakes: state.numberOfCakes - 1,
			};
		default:
			return state;
	}
};

const icecreamReducer = (state = initialCakeStore, action) => {
	switch (action.type) {
		case BUY_ICECREAM:
			return {
				...state,
				numberOfIcecreams: state.numberOfIcecreams - 1,
			};
		default:
			return state;
	}
};
```

<h4>The rootStore & combineReducers</h4>

<p>this method help us to set more reducers in the store</p>

```js
// firsty we need to import the combineReducers method
const combineReducers = redux.combineReducers;

const rootStore = combineReducers({
	cake: cakeReucer,
	iceCream: iceCreamReducer,
});
```

<h4>the rootStore</h4>

```js
const store = createStore(rootStore);

// to have access on the store we have to subscribe to it by .subscrib() method
const unsubscribe = store.subscibe(() => {
	console.log(store.getState());
});
// store.getState() // this method allow us to see the current state of the store

// to edit the state of the store we need to use the .dispatch() method
store.dispatch(buyCake()); // now we bought a cake
store.dispatch(buyIcecream()); // we bought an icecream

unsubscribe(); // now we tell the store that we finished our operation
```

<h4>applyMiddleware</h4>

<h5 id='logger'>logger middleware </h5>

<p>is a best practice tool to follow (in the log console) the flow of the store<p>

<h6>Install the logger library<h6>

```sh
npm i redux-logger
```

```js
// importing the library
const reduxLoggger = require("redux-logger");
/// importing the library

//
// define the logger method
const logger = reduxLogger.createLogger();
// define the logger method

// using it

// to use is we need to import the applyMiddleware method

// applyMiddleware
const applyMiddleware = redux.applyMiddleware;
// applyMiddleware

const store = createStore(rootStore, applyMiddleware(logger));
// instead of the traditional way
```

 <h4>Thunk middleware</h4>

<p>the target of using thunkMiddleware is to work with asynchronous actions</p>

<h6>import the redux library</h6>

```js
[asyncActios.js];

const redux = require("redux");
```

<h6>set the actions & the actions creators</h6>

```js
//set the actions

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// the actions creators

const fetchUsersRequrest = () =>{
	return: {
		type: FETCH_USERS_REQUEST,
	}
}
const fetchUsersSuccess = (users) =>{
	return: {
		type: FETCH_USERS_SUCCESS,
		payload: users
	}
}
const fetchUsersFailure = (error) =>{
	return: {
		type: FETCH_USERS_FAILURE,
		payload: error
	}
}

```

<h6>define the reducer functiion</h6>

```js
// set the initialState object

const initialState = {
	loading: false,
	users: [],
	error: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_USERS_FAILURE:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};
```

<h6>
define the fetching data function
</h6>

```js
// in this step we are using the axios library for best practice

const axios = require("axios");

const fetchUsers = () => {
	return function (dispatch) {
		dispatch(fetchUsersRequest());

		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				const users = responce.data.map((user) => user.id);
				dispatch(fetchUsersSuccess(users));
			})
			.catch((err) => dispatch(fetchUsersFailure(err.message)));
	};
};
```

<h6>creating the store</h6>

```js
// firstly let's import the thunkMiddleware & the applyMiddleware method

const thunkMiddleware = require("redux-thunk").default; // after installing it

const applyMiddleware = redux.applyMiddleware;

const createStore = redux.createStore;
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// now we are finish our preparation of the store let's try to fetch from it

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
```

<b>To SUMMURIZE</b>

<ul>
	<li>import the redux library</li>
	<li>define the acions & the acions creators</li>
	<li>create the fetchUsers funtion with axios</li>
	<li>create the store & add to it the thunck middleware method</li>
</ul>
