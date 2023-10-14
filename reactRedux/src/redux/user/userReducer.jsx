import * as actions from "./actionTypes";

const initialState = {
	loading: false,
	users: [],
	error: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actions.FETCH_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case actions.FETCH_USERS_FAILED:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
		default:
			return state;
	}
};
