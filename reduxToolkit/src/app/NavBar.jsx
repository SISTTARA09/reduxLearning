import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
	return (
		<nav>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/cakeshop">Cake</NavLink>
			<NavLink to="/icecream">Icecream</NavLink>
			<NavLink to="/bank">Bank</NavLink>
			<NavLink to="/todos">Todos</NavLink>
		</nav>
	);
};

export default NavBar;
