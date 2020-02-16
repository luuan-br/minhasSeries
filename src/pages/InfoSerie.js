import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {
	const [form, setForm] = useState({});
	const [sucess, setSucess] = useState(false);
	const [editMode, setMode] = useState(false);
	const [data, setDate] = useState([]);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		axios.get("/api/series/" + match.params.id).then(res => {
			setDate(res.data);
			setForm(res.data);
		});
	}, [match.params.id]);

	useEffect(() => {
		axios.get("/api/genres/").then(res => {
			setGenres(res.data.data);
		});
	}, [data]);

	// custom header
	const masterHeader = {
		height: "50vh",
		minHeight: "500px",
		backgroundImage: `url('${data.background}')`,
		backgroundSize: "cover",
		backgroundPosition: "top",
		backgroundRepeat: "no-repeat"
	};

	const handleChange = field => e => {
		setForm({
			...form,
			[field]: e.target.value
		});
	};

	const seleciona = value => () => {
		setForm({
			...form,
			status: value
		});
	};

	const handleForm = e => {
		e.preventDefault();
		axios
			.put("/api/series/" + match.params.id, form)
			.then(res => setSucess(true));
	};

	if (sucess) {
		return <Redirect to="/series"></Redirect>;
	}

	return (
		<div>
			<header style={masterHeader} className="mb-4">
				<div
					className="h-100"
					style={{ background: "rgba(0,0,0,0.7)" }}
				>
					<div className="h-100 container">
						<div className="row h-100 align-items-center">
							<div className="col-3">
								<img
									className="img-fluid img-thumbnail"
									src={data.poster}
									alt="img"
								/>
							</div>
							<div className="col-8">
								<h1 className="font-weight-light text-light">
									{data.name}
								</h1>
								<div className="lead text-white">
									<p>Genero: {data.genre}</p>
									{data.status === "ASSISTIDO" && (
										<Badge color="success">Assitido</Badge>
									)}
									{data.status === "PARA ASSISTIR" && (
										<Badge color="warning">
											Para Assistir
										</Badge>
									)}
									<div className="mt-3">
										<button
											className={`btn ${
												editMode
													? "btn-dark"
													: "btn-primary"
											}`}
											onClick={() => setMode(!editMode)}
										>
											{editMode
												? "Cancelar edicao"
												: "Editar"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{editMode && (
				<div className="container mb-5">
					<h1>Info Series</h1>
					{JSON.stringify(form)}
					<form>
						<div className="form-group">
							<label htmlFor="name">Nome</label>
							<input
								type="text"
								className="form-control"
								id="name"
								aria-describedby="NameSerie"
								placeholder="Nome do serie"
								value={form.name ?? ""}
								onChange={handleChange("name")}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="comments">Comentarios</label>
							<input
								type="text"
								className="form-control"
								id="comments"
								aria-describedby="NameSerie"
								placeholder="Comentarios"
								value={form.comments ?? ""}
								onChange={handleChange("comments")}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="">Genero</label>
							<select
								className="form-control"
								name=""
								onChange={handleChange("genre_id")}
							>
								{genres.map(genre => (
									<option
										key={genre.id}
										value={genre.id ?? ""}
										select={genre.id && form.genre_id}
									>
										{genre.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="status"
								id="assistido"
								value="ASSISTIDO"
								onClick={seleciona("ASSISTIDO")}
							/>
							<label
								className="form-check-label"
								htmlFor="assistido"
							>
								ASSISTIDO
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="status"
								id="ParaAssistir"
								value="PARA ASSISTIR"
								onClick={seleciona("PARA ASSISTIR")}
							/>
							<label
								className="form-check-label"
								htmlFor="ParaAssistir"
							>
								PARA ASSISTIR
							</label>
						</div>
						<button
							type="button"
							className="btn btn-primary mt-4"
							onClick={handleForm}
						>
							Salvar
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default InfoSerie;
