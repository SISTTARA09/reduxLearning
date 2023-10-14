<h2>Getting Started With React-Redux</h2>

<h3>Installing</h3>

```sh
npm install redux react-redux
```

<h3>Creating the CakeContainer [Component] </h3>

<i>this is the component that we will configure the buying operation in it</i>

```jsx
["components/CakeContainer.jsx"];
const CakeContainer = () => {
	return (
		<div>
			<h3>Number Of Cakes: </h3>
			<button>Buy Cake</button>
		</div>
	);
};
export default CakeContainers;
```

<h3>Create the actionTypes</h3>

```jsx
["redux/cake/actionTypes.jsx"];

export const BUY_CAKE = "BUY_CAKE";
```

<h3>Create the cakeActions</h3>

```jsx
["redux/cake/cakeActions.jsx"];

import { BUY_CAKE } from "./actionTypes";

export default () => {
	return {
		type: BUY_CAKE,
	};
};
```

<h3>create The Reducer Function</h3>

```jsx
["redux/cake/cakeReducer.jsx"];

import { BUY_CAKE } from "./actionTypes";

// set the initial state
const initialState = {
	numberOfCakes: 10,
};
// define the reducer function
export default (state = initialState, action) => {
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
```

<h3>create the Store</h3>

```jsx
import storeReducer from "./cakeReducer";

import { createStore } from "redux";

export const store = createStore(storeReducer);
```

<h3>Provide The Store To All the Components </h3>

```jsx
["App.jsx"];

import { Provider } from "react-redux";
import CakeContainer from "./components/CakeContainer";
import { store } from "./redux/cake/store";

const App = () => {
	return (
		<Provider store={store}>
			<CakeContainer />
		</Provider>
	);
};
export default App;
```

<h3>configure the CakeContainer Component to access the store</h3>

```jsx
["components/CakeContainer.jsx"];

import buyCake from "../redux/cake/cakeActions";
import { connect } from "react-redux";

const CakeContainer = (props) => {
	return (
		<div>
			<h3>Number Of Cakes: {props.numberOfCakes} </h3>
			<button onClick={props.buyCake}>Buy Cake</button>
		</div>
	);
};

// to get the current number of cakes in the store we will use mapStateToProps
const mapStateToProps = (state) => {
	return {
		numberOfCakes: state.numberOfCakes,
	};
};

// to get access on the store we will the dispatch in mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
	return {
		buyCake: () => dispatch(buyCake()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);
```

<i><b>Note:</b>
this folder structor is not required, you can use any structor that you find your self familliar with, it is optional.</i>

<h3>Add icecream to the store Using useDispatch & useSelector Hooks</h3>

<h4>Edit The Store using CombineReducer Method</h4>

```jsx
["store.jsx"];
import { combineReducers } from "redux";
import { logger } from "redux-logger";

const rootStore = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
});

const store = createStore(rootStore, applyMiddleware(logger));

// we also use the logger middleware here
["../reduxJs/TUTORIAL.md"];
```

<h4>create the iceCream component</h4>

```jsx
import { buyIceCream } from "../redux/iceCream/IceCreamActions";
import { useDispatch, useSelector } from "react-redux";

const IceCreamComponent = () => {
	const numberOfIceCreams = useSelector(
		(state) => state.iceCream.numberOfIceCreams
	);
	const dispatch = useDispatch();
	return (
		<div>
			<h3>Number Of IceCreams: {numberOfIceCreams} </h3>
			<button onClick={() => dispatch(buyIceCream())}>Buy IceCream</button>
		</div>
	);
};

export default IceCreamComponent;
```

<h3>use Redux DevTools</h3>

<h4>Installing</h4>

```sh
npm i -s redux-devtools-extension
```

<h4>Activating</h4>

```jsx
["store.jsx"];

import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(logger))
);
```

<h4>Using</h4>

<i>install the extention from the browser store </i>

<marquee>opren browser => right click => redux DevTools </marquee>

<h3>Buy cakes with apreciate number</h3>

<i>this function allow us to buy many cakes by one click</i>

<h4>Create the component</h4>

```jsx
["./src/components/BuyByNum.jsx"];

import { useState } from "react";
import { buyCake } from "../redux/cake/cakeActions";
import { useDispatch, useSelector } from "react-redux";

const BuyByNum = () => {
	const [number, setNumber] = useState(1);
	const numberOfCakes = useSelector((state) => state.cake.numberOfCakes);
	// take the value from the store
	const dispatch = useDispatch();
	return (
		<div>
			<input
				type="text"
				value={number}
				onChange={(e) => setNumber(e.target.value)}
			/>
			{/*on user enter the number the number value updated*/}
			<button onClick={() => dispatch(buyCake(number))}>
				{/*occur the buyCake function*/}
				Buy {number} cakes
			</button>
		</div>
	);
};

export default BuyByNum;
```

<h4>Update the reducer function</h4>

```jsx
["cakeReducer.jsx"];

export default (state = initialCakeState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				numberOfCakes: state.numberOfCakes - action.payLoad,
				// buy cakes with entered number
			};
		default:
			return state;
	}
};
```

<h4>Update the cakeActions</h4>

```jsx
export const buyCake = (number = 1) => {
	return {
		type: BUY_CAKE,
		payLoad: number, // set payload to the number entered || or 1 if not
	};
};
```

<h3>mapStateToProps && mapDispatchToProps: InterMidiate</h3>

<h4>mapStateToProps</h4>

<i>
mapStateToprops is accept two arguments one is for the state,
second [is comming from the App componnet < MapState cake /> ] is for our needs,in this example we pass our second arg,
to depend on to show the status of our store
</i>

```jsx
import { connect } from "react-redux";

const MapState = ({ item, func }) => {
	return (
		<div>
			<h3>Item - {item} </h3>
		</div>
	);
};

const mapStateToprops = (state, own) => {
	let item = own.cake
		? state.cake.numberOfCakes
		: state.iceCream.numberOfIceCreams;
	return {
		item,
	};
};

export default connect(mapStateToProps)(MapState);
```

<h4>mapDispatchToProps</h4>

<i>
mapDispatchToprops also accept two arguments one is for the dispatch,
second is for our needs,in this example we pass our second arg,
to depend on to do dispatch wether the user want a cake or iceCream.
</i>

```jsx
import { connect } from "react-redux";
import { buyCake } from "../redux/cake/cakeActions";
import { buyIceCream } from "../redux/iceCream/IceCreamActions";

const MapState = ({ item, func }) => {
	return (
		<div>
			<h3>Item - {item} </h3>
			<button onClick={func}>buy Item </button>
		</div>
	);
};

const mapDispatchToprops = (dispatch, ownFunc) => {
	const func = ownFunc.cake
		? () => dispatch(buyCake())
		: () => dispatch(buyIceCream());
	return {
		func,
	};
};

export default connect(mapStateToprops, mapDispatchToprops)(MapState);
```

<h3>Using Asynchronous Functions</h3>

<h4>First, let's create the actions</h4>

```jsx
["user/userAction.jsx"];

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILED = "FETCH_USER_FAILED";
```

<h4>create the action creators</h4>

```jsx
["/user/actionsCreators.jsx"];

import {
	FETCH_USER_FAILED,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
} from "./userActions";

export const fetchUserRequest = () => {
	return {
		type: FETCH_USER_REQUEST,
	};
};
export const fetchUserSuccess = (users) => {
	return {
		type: FETCH_USER_SUCCESS,
		payload: users,
	};
};
export const fetchUserFailed = (error) => {
	return {
		type: FETCH_USER_FAILED,
		payload: error,
	};
};
```

<h4>define the reducer function</h4>

```jsx
["/user/usersReducer.jsx"];

import {
	FETCH_USER_FAILED,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
} from "./userActions";

const initialState = {
	loading: false,
	users: [],
	error: "",
};

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USER_SUCCESS:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_USER_FAILED:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
		default:
			return state;
	}
};
```

<h4>add the reducer to the store</h4>

<i>Here we also add the thunk middleware</i>

```jsx
["./store.jsx"];

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { logger } from "redux-logger";
import cakeReducer from "./cake/cakeReducer";
import iceCreamReducer from "./iceCream/iceCreamReducer";
import { usersReducer } from "./user/usersReducer";

const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
	users: usersReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(logger, thunk))
);
```

<h4>Finaly Let's create the component</h4>

```jsx
["components/UserData.jsx"];

import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux/user/fetchUsers";

const UserData = ({ users, fetchUsers }) => {
	// to fetch the data only one time we use useEffect Hook
	useEffect(() => {
		fetchUsers();
	}, []);
	//
	return (
		<ul>
			{users.map((user) => {
				return <h5 key={user.id}> {user.username} </h5>;
			})}
			{/*display the usernames of each user*/}
		</ul>
	);
};

// to pass to the props, the responde data from the store
const mapStateToProps = (state) => {
	return {
		users: state.users.users,
	};
};

// to pass the fetchUsers function  to the props.
const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(fetchUsers()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
```

<b>NOTES:</b>

- instead of using mapStateToProps & mapDispatchToProps fucntions you can use useSelector & useDispatch Hooks.
