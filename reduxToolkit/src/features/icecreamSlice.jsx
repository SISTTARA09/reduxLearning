import { createSlice } from "@reduxjs/toolkit";

const iceCreamSlice = createSlice({
	name: "icecream",
	initialState: {
		numOfIcecream: 15,
	},
	reducers: {
		buyIceCream: (state) => {
			state.numOfIcecream--;
		},
	},
});

export const { buyIceCream } = iceCreamSlice.actions;

export default iceCreamSlice.reducer;
