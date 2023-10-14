import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyIceCream } from "../features/icecreamSlice";

const Icecream = () => {
	const numOfIcecreams = useSelector(
		(state) => state.icecreamStore.numOfIcecream
  );
  const dispatch = useDispatch()
  return <div>
    <h3>{numOfIcecreams}</h3>
    <button onClick={() => dispatch(buyIceCream())} >Buy Icecream</button>
  </div>;
};

export default Icecream;
