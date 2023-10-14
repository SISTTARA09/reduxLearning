import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
	deposit,
	withraw,
	givenDeposit,
	givenWithraw,
} from "../features/bankSlice";

const Counter = () => {
	const [money, setMoney] = useState(100);
	const count = useSelector((state) => state.bank.value);
	const dispatch = useDispatch();
	return (
		<>
			<div>{count}</div>
			<button onClick={() => dispatch(deposit())}>deposit</button>
			<button onClick={() => dispatch(withraw())}>withraw</button>
			<input
				type="number"
				value={money}
				onChange={(e) => setMoney(Number(e.target.value))}
			/>
			<button onClick={() => dispatch(givenDeposit(money))}>
				deposit {money}
			</button>
			<button onClick={() => dispatch(givenWithraw(money))}>
				withraw {money}
			</button>
		</>
	);
};

export default Counter;
