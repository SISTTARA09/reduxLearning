import { BUY_CAKE } from "./actionTypes";

const initialCakeState = {
	numberOfCakes: 10,
};

export default (state = initialCakeState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				numberOfCakes: state.numberOfCakes - action.payLoad,
			};
		default:
			return state;
	}
};
