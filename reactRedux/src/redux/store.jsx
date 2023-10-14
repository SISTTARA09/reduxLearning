import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { logger } from "redux-logger";
import cakeReducer from "./cake/cakeReducer";
import iceCreamReducer from "./iceCream/iceCreamReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
	users: userReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(logger, thunk))
);
