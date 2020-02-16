import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import axios from "axios";

import Header from "./components/Header";

import Home from "./pages/Home";
import Generos from "./pages/Generos";
import NewGenre from "./pages/NewGenre";
import EditarGenero from "./pages/EditarGenero";
import Series from "./pages/Series";
import NewSeries from "./pages/NewSeries";
import InfoSerie from "./pages/InfoSerie";

function App() {
	return (
		<Router>
			<div>
				<Header />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/generos" exact component={Generos} />
					<Route path="/generos/novo" exact component={NewGenre} />
					<Route path="/generos/:id" exact component={EditarGenero} />
					<Route path="/series" exact component={Series} />
					<Route path="/series/novo" exact component={NewSeries} />
					<Route path="/series/:id" exact component={InfoSerie} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
