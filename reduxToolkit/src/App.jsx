import React from "react";
import Bank from "./app/Bank";
import { Provider } from "react-redux";
import store from "./features/store";
import Router from "./router/Router";
const App = () => {
	return (
		<>
			<Provider store={store}>
				<Router/>
			</Provider>
		</>
	);
};

export default App;
