import React, { useState } from "react";
import { buyCake } from "../redux/cake/cakeActions";
import { useDispatch, useSelector } from "react-redux";

const BuyByNum = () => {
	const [number, setNumber] = useState(1);
	const numberOfCakes = useSelector((state) => state.cake.numberOfCakes);
	const dispatch = useDispatch();
	return (
		<div>
			<input
				type="text"
				value={number}
				onChange={(e) => setNumber(e.target.value)}
			/>
			<button onClick={() => dispatch(buyCake(number))}>
				Buy {number} cakes
			</button>
		</div>
	);
};

export default BuyByNum;
