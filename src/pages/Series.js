import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Series = () => {
	const [data, setDate] = useState([]);

	useEffect(() => {
		axios.get("/api/series").then(res => setDate(res.data.data));
	}, []);

	const deleteSerie = id => {
		axios.delete("/api/series/" + id).then(res => {
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
					onClick={() => deleteSerie(record.id)}
				>
					Remover
				</button>
				<Link to={"/series/" + record.id} className="btn btn-warning">
					Info
				</Link>
			</td>
		</tr>
	);

	if (data.length === 0) {
		return (
			<div className="container">
				<h1>Series</h1>
				<div className="alert alert-warning" role="alert">
					Voce nao possui series criados.
				</div>
				<Link to="/series/novo" className="btn btn-primary mb-3">
					Adicionar serie
				</Link>
			</div>
		);
	}

	return (
		<div className="container">
			<h1>Series</h1>
			<Link to="/series/novo" className="btn btn-primary mb-3">
				Novo series
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

export default Series;