import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Generos = () => {
	const [data, setDate] = useState([]);

	useEffect(() => {
		axios.get("/api/genres").then(res => setDate(res.data.data));
	}, []);

	const deleteGenero = id => {
		axios.delete("/api/genres/" + id).then(res => {
			const filtro = data.filter(item => item.id !== id);
			setDate(filtro);
		});
	};

	const renderRow = record => (
		<tr key={record.id}>
			<th scope="row">{record.id}</th>
			<td>{record.name}</td>
			<td>
				<button
					className="btn btn-danger mr-3"
					onClick={() => deleteGenero(record.id)}
				>
					Remover
				</button>
				<Link to={"/generos/" + record.id} className="btn btn-warning">
					Editar
				</Link>
			</td>
		</tr>
	);

	if (data.length === 0) {
		return (
			<div className="container">
				<h1>Generos</h1>
				<div className="alert alert-warning" role="alert">
					Voce nao possui generos criados.
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<h1>Generos</h1>
			<Link to="/generos/novo" className="btn btn-primary mb-3">
				Novo genero
			</Link>
			<table className="table table-dark">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Nome</th>
						<th scope="col">Açoes</th>
					</tr>
				</thead>
				<tbody>{data.map(renderRow)}</tbody>
			</table>
		</div>
	);
};

export default Generos;
