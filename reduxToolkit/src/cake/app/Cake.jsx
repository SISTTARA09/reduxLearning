import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCake } from "../features/cakeSlice";

const Bank = () => {
	const numOfCakes = useSelector((state) => state.cakeStore.numOfCakes);
	const dispatch = useDispatch();
	return (
		<div>
			<h3>{numOfCakes}</h3>
			<button
				onClick={() => dispatch(buyCake())}
				className=" rounded text-red-500 bg-stone-300"
			>
				buy Cake
			</button>
		</div>
	);
};

export default Bank;
