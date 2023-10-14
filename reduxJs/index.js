// import libraries
const redux = require("redux");
const reduxLogger = require("redux-logger");
/// import libraries

// methodes
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
/// methodes

// actions
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
/// actions

// actions creators
const buyCake = () => {
	return {
		type: BUY_CAKE,
		info: "cake storage",
	};
};
const buyIcecream = () => {
	return {
		type: BUY_ICECREAM,
		info: "icecream storage",
	};
};
/// actions creator

// the initialState
const initialCakeStore = {
	numberOfCakes: 10,
};
const initialIcecreamStore = {
	numberOfIcecreams: 15,
};
/// the initialState

// the reducer functions
const cakeReducer = (state = initialCakeStore, action) => {
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

const icecreamReducer = (state = initialIcecreamStore, action) => {
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
/// the reducer functions

// the rootStore
const rootStore = combineReducers({
	// the combineReducer is used to set in the store more products
	cake: cakeReducer,
	icecream: icecreamReducer,
});
// the rootStore

const store = createStore(rootStore, applyMiddleware(logger)); // create the store // use logger to follow the flow of the store
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyIcecream());
unsubscribe();
