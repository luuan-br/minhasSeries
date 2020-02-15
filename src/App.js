import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import axios from "axios";

import Header from "./components/Header";

import Home from "./pages/Home";
import Generos from "./pages/Generos";
import NewGenre from "./pages/NewGenre";
import EditarGenero from "./pages/EditarGenero";

function App() {
	return (
		<Router>
			<div>
				<Header />
				<Route path="/" exact component={Home} />
				<Route path="/generos/:id" exact component={EditarGenero} />
				<Route path="/generos/novo" exact component={NewGenre} />
				<Route path="/generos" exact component={Generos} />
			</div>
		</Router>
	);
}

export default App;
