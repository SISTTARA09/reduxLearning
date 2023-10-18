import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./user/features/usersSlice";
import cakekReducer from "./cake/features/cakeSlice";

export default configureStore({
	reducer: {
		cakeStore: cakekReducer,
		usersStore: usersReducer,
	},
});
