import { createSlice } from "@reduxjs/toolkit";

import getUsers from "./getUsers";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: Array(),
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (_) => Object({ loading: true }))
			.addCase(getUsers.fulfilled, (_, action) => ({ users: action.payload }))
			.addCase(getUsers.rejected, (_, action) => ({
				error: action.error.message,
			}));
	},
});

export default usersSlice.reducer;
