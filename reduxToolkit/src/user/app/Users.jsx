import React, { useCallback, useEffect } from "react";
import getUsers from "../features/getUsers";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
	const users = useSelector((state) => state.usersStore);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, []);
	console.log(users);
	return users.loading ? (
		<h4>Loading...</h4>
	) : users.error ? (
		<h4> {users.error} </h4>
	) : (
		<ul>
			{users.users.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
};

export default Users;
