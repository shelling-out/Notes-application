import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login({ setLoggedin }) {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const submitHandler = async () => {
		const data = {
			username: username,
			password: password,
		};
		let response = await fetch("/api/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) navigate("/notes");
		else {
			try {
				const text = await response.text();
				const responseText = JSON.parse(text);
				if (responseText === "USERNAME OR PASSWORD IS WRONG") {
					setTimeout(2000, alert("username or password is wrong"));
				} else if (responseText === "YOU ARE ALREADY AUTHENTICATED") {
					setTimeout(2000, alert("you are already authnticated"));
				}
			} catch {}
		}
	};
	return (
		<>
			<div className="fields">
				<div className="field">
					<label>Username </label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="inputfiled"
					></input>
				</div>
				<div className="field">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="inputfiled"
					></input>
				</div>
				<h3 style={{ color: "white" }}> {error}</h3>
				<button className="btn" onClick={submitHandler}>
					Submit
				</button>
			</div>
			<div
				style={{
					textAlign: "center",
					boxShadow: "5px 5px 5px white",
					fontSize: "2rem",
				}}
			>
				<Link to="/register">or Register </Link>
			</div>
		</>
	);
}
