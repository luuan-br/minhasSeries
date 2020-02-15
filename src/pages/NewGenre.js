import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NewGenre = () => {
	const [name, setName] = useState("");
	const [sucess, setSucess] = useState(false);

	const handleForm = e => {
		e.preventDefault();
		axios.post("/api/genres", { name }).then(res => setSucess(true));
	};

	if (sucess) {
		return <Redirect to="/generos"></Redirect>;
	}

	return (
		<div className="container">
			<h1>Generos</h1>
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

export default NewGenre;
