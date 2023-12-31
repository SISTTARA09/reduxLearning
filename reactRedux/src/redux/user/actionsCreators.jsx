import * as actions from "./actionTypes";

export const fetchUsersRequest = () => {
	return {
		type: actions.FETCH_USERS_REQUEST,
	};
};

export const fetchUsersSuccess = (users) => {
	return {
		type: actions.FETCH_USERS_SUCCESS,
		payload: users,
	};
};

export const fetchUsersFailed = (error) => {
	return {
		type: actions.FETCH_USERS_FAILED,
		payload: error,
	};
};
