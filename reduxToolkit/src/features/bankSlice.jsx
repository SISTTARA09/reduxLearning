import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 10000,
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		deposit: (state) => {
			state.value += 100;
		},
		withraw: (state) => {
			state.value -= 100;
		},
		givenDeposit: (state, action) => {
			state.value += action.payload;
		},
		givenWithraw: (state, action) => {
			state.value -= action.payload;
		},
	},
});

export const { deposit, withraw, givenDeposit, givenWithraw } =
	counterSlice.actions;

export default counterSlice.reducer;
