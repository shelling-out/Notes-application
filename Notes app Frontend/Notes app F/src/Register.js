import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Register() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const submitHandler = async () => {
		const data = {
			username: username,
			password: password,
		};
		try {
			const response = await fetch("/api/register/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const text = await response.text();
			const responseText = await JSON.parse(text);
			if (responseText === "YOU ALREADY HAVE AN ACCOUT") {
				setTimeout(2000, alert("you already have an account"));
			} else if (responseText === "USERNAME ALREADY EXIST") {
				setTimeout(2000, alert("user already exist try another username :("));
			} else if (responseText === "USER HAS BEEN CREATED") {
				navigate("/");
			}
		} catch {}
	};
	return (
		<>
			<div className="fields">
				<div className="field">
					<label>Username </label>
					<input
						type="text"
						className="inputfiled"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></input>
				</div>
				<div className="field">
					<label>Password</label>
					<input
						type="password"
						className="inputfiled"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>

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
				<Link to="/">or Login </Link>
			</div>
		</>
	);
}
