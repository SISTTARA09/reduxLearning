import React from "react";
import { buyCake } from "../features/cakeSlice";
import { useSelector, useDispatch } from "react-redux";
const Cake = () => {
	const numOfCakes = useSelector((state) => state.cakeStore.numOfCakes);
	const dispatch = useDispatch();
	return (
		<div>
			<div>{numOfCakes}</div>
			<button onClick={() => dispatch(buyCake())}>Buy Cake</button>
		</div>
	);
};

export default Cake;
