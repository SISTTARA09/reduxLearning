import { BUY_CAKE } from "./actionTypes";

export const buyCake = (number = 1) => {
	return {
		type: BUY_CAKE,
		payLoad: number,
	};
};
