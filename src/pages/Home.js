import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
	const [data, setDate] = useState([]);

	useEffect(() => {
		axios.get("/api/series/").then(res => {
			setDate(res.data.data);
		});
	}, []);
	console.log(data);

	return (
		<div className="container">
			<div className="row">
				{data &&
					data.map(serie => (
						<div className="col-3 mt-3 mb-3">
							<img
								src={serie.poster}
								alt={serie.name}
								width={300}
								className="img-thumbnail"
							/>
							<div className="w-100">
								<Link
									to={"/series/" + serie.id}
									className="btn btn-primary mt-3 mb-3 w-100"
								>
									Informacoes
								</Link>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Home;
