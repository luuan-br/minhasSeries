import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const EditarGenero = ({ match }) => {
	const [name, setName] = useState("");
	const [sucess, setSucess] = useState(false);

	useEffect(() => {
		axios
			.get("/api/genres/" + match.params.id)
			.then(res => setName(res.data.name));
	}, [match.params.id]);

	const handleForm = e => {
		e.preventDefault();
		axios
			.put("/api/genres/" + match.params.id, { name })
			.then(res => setSucess(true));
	};

	if (sucess) {
		return <Redirect to="/generos"></Redirect>;
	}

	return (
		<div className="container">
			<h1>Editar Generos</h1>
			<form>
				<div className="form-group">
					<label htmlFor="name">Nome</label>
					<input
						type="text"
						className="form-control"
						id="name"
						aria-describedby="NameGenero"
						placeholder="Nome do genero"
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

export default EditarGenero;
