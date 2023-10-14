import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import fetchUsers from "../redux/user/fetchUsers";

const UsersData = () => {
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUsers());
  }, []);
  console.log(users)
  return   users?.loading? <h3>Loading</h3> : users?.error? <h3> {users.error} </h3>:   (
		<ul>
			{users.users.map((user) => {
				return <li key={user.id}> {user.username} </li>;
			})}
		</ul>
	);
};

export default UsersData;
