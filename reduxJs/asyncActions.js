const redux = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;

const createStore = redux.createStore; // define the createStore method
const applyMiddleware = redux.applyMiddleware; // define the applyMiddleware method

// set the initialState
const initialState = {
	loading: false,
	users: [],
	error: "",
};
// set the initialState

// set the actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
// set the actions

// action creator
const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};
const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
};
const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error,
	};
};
// action creator

// reducer function
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
// reducer function

const store = createStore(reducer, applyMiddleware(thunkMiddleware)); // create the store

// fetch the data
const fetchUsers = () => {
	return function (dispatch) {
		dispatch(fetchUsersRequest());
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((respnse) => {
				const users = respnse.data.map((user) => user.id);
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				dispatch(fetchUsersFailure(error.message));
			});
	};
};
// fetch the data

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
