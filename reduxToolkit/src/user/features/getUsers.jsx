import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

export default createAsyncThunk("users/getUsers", async () => {
	const response = await fetch(apiUrl);
	try {
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
});
