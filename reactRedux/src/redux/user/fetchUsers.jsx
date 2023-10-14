import * as creators from "./actionsCreators";

export default () => {
	return async (dispatch) => {
		dispatch(creators.fetchUsersRequest());
		const MAIN_DATA = await fetch("https://jsonplaceholder.typicode.com/users");
		try {
			const DATA = await MAIN_DATA.json();
			dispatch(creators.fetchUsersSuccess(DATA));
		} catch (error) {
			dispatch(creators.fetchUsersFailed(error));
		}
	};
};

