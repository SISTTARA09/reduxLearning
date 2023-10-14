import { connect } from "react-redux";
import { buyCake } from "../redux/cake/cakeActions";
import { buyIceCream } from "../redux/iceCream/IceCreamActions";

const MapState = ({ item, func }) => {
	return (
		<div>
			<h3>Item - {item} </h3>
			<button onClick={func}>buy Item </button>
		</div>
	);
};

const mapStateToprops = (state, own) => {
	let item = own.cake && state.cake.numberOfCakes;
	return {
		item,
	};
};

/*
mapStateToprops is accept two arguments one is for the state,
second is for our needs,in this example we pass our second arg,
to depend on to do show the status of our store
*/

const mapDispatchToprops = (dispatch, ownFunc) => {
	const func = ownFunc.cake
		? () => dispatch(buyCake())
		: () => dispatch(buyIceCream());
	return {
		func,
	};
};

/*
mapDispatchToprops also accept two arguments one is for the dispatch,
second is for our needs,in this example we pass our second arg,
to depend on to do dispatch wether the user want a cake or iceCream
*/

export default connect(mapStateToprops, mapDispatchToprops)(MapState);
