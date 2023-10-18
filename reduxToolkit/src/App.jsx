import React from "react";
import Users from "./user/app/Users";

import { Provider } from "react-redux";
import store from "./store";
import Cake from "./cake/app/Cake";
const App = () => {
	return (
		<Provider store={store}>
			<Users />
			<Cake />
		</Provider>
	);
};

export default App;
