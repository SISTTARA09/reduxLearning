// external data
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import Logger from "redux-logger";
import ThunkMiddleware from "redux-thunk";

// Our data
import counterSlice from "./bankSlice";
import cakeSlice from "./cakeSlice";
import icecreamSlice from "./icecreamSlice";
import todosSlice from "./todosSlice";

export default configureStore(
	{
		reducer: {
			bank: counterSlice,
			cakeStore: cakeSlice,
			icecreamStore: icecreamSlice,
			todosStore: todosSlice,
		},
	},
	applyMiddleware(Logger, ThunkMiddleware)
);
