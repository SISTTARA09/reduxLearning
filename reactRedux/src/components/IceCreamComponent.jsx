
import { buyIceCream } from "../redux/iceCream/IceCreamActions";
import {  useDispatch, useSelector } from "react-redux";

const IceCreamComponent = () => {
	const numberOfIceCreams = useSelector(state => state.iceCream.numberOfIceCreams)
	const dispatch = useDispatch()
	return (
		<div>
			<h3>Number Of IceCreams: {numberOfIceCreams} </h3>
			<button onClick={() => dispatch(buyIceCream())}>Buy IceCream</button>
		</div>
	);
};



export default IceCreamComponent;
