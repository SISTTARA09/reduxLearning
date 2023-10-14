import { BUY_ICECREAM } from "./actionTypes";

const initialIceCramState = {
	numberOfIceCreams: 15,
};

export default (state = initialIceCramState, action) => {
	switch (action.type) {
		case BUY_ICECREAM:
			return {
				numberOfIceCreams: state.numberOfIceCreams - 1,
			};
		default:
			return state;
	}
};
