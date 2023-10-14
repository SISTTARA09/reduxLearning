import { Provider } from "react-redux";
import { store } from "./redux/store";

// components
import CakeComponent from "./components/CakeComponent";
import IceCreamComponent from "./components/IceCreamComponent";
import BuyByNum from "./components/BuyByNum";
import MapState from "./components/MapState";
import UsersData from "./components/UsersData";
// components
const App = () => {
	return (
		<>
			<Provider store={store}>
				{/* <CakeComponent />
				<BuyByNum />
				<IceCreamComponent />
				<MapState cake /> */}
				<UsersData />
			</Provider>
		</>
	);
};

export default App;
