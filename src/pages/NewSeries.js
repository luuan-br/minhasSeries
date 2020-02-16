import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NewSeries = () => {
	const [name, setName] = useState("");
	const [sucess, setSucess] = useState(false);

	const handleForm = e => {
		e.preventDefault();
		if (!name) return;
		axios.post("/api/series", { name }).then(_ => setSucess(true));
	};

	if (sucess) {
		return <Redirect to="/series"></Redirect>;
	}

	return (
		<div className="container">
			<h1>Series</h1>
			<form>
				<div className="form-group">
					<label htmlFor="name">Nome</label>
					<input
						type="text"
						className="form-control"
						id="name"
						aria-describedby="NameSerie"
						placeholder="Nome da serie"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<button
					type="button"
					className="btn btn-primary"
					onClick={handleForm}
				>
					Salvar
				</button>
			</form>
		</div>
	);
};

export default NewSeries;
