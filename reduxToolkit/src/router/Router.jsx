import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CakeShop from "../app/CakeShop";
import Bank from "../app/Bank";
import Home from "../app/Home";
import NavBar from "../app/NavBar";
import Icecream from "../app/Icecream";
import Todos from "../app/Todos";
const Router = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route index Component={Home} />
				<Route path="/cakeshop" element={<CakeShop />} />
				<Route path="/iceCream" element={<Icecream />} />
				<Route path="/bank" element={<Bank />} />
				<Route path="/todos" element={<Todos />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
