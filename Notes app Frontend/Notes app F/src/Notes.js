import "./Notes.css";
import icon from "./Untitled.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function Notes() {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(1);
	const [id, setId] = useState();
	const navigate = useNavigate();
	const getNotes = async () => {
		try {
			const response = await fetch("/api/notes");
			const data = await response.json();
			setNotes(data);
			setLoading(0);
		} catch {}
	};

	const logouthandler = async () => {
		try {
			let response = await fetch("/api/logout/");
			if (response.ok) navigate("");
		} catch {}
		navigate("/");
	};
	const DeleteHandler = async (e) => {
		let cookie = document.cookie;
		cookie = cookie.slice(10, cookie.length);
		let response = await fetch(`/api/notes/${id}/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": cookie,
			},
		});
		navigate("/notes");
	};
	useEffect(() => {
		getNotes();
		console.log(document.cookie);
	}, []);
	return (
		<>
			<div className="container">
				<div className="nav">
					<h1 className="nav-title">
						<img src={icon}></img>Notes
					</h1>
				</div>
				<Link to={`/notes/x`}>
					<button className="btn" style={{ marginTop: "0.6rem" }}>
						Add note
					</button>
				</Link>

				{loading
					? ""
					: notes.map((note) => {
							return (
								<div className="item" key={note.id}>
									<Link to={`/notes/${note.id}`}>
										<h2 class	Name="title">{note.title}</h2>
									</Link>
									<h4 className="body">
										{note.body.slice(0, 40)}
										{note.body.length <= 20 ? "" : "..."}
									</h4>
									<button
										onClick={DeleteHandler}
										onMouseOver={() => setId(note.id)}
										style={{
											width: "100%",
											fontSize: "1.3rem",
											backgroundColor: "rgba(73, 73, 73, 0.333)",
										}}
									>
										{" "}
										Delete{" "}
									</button>
								</div>
							);
					  })}
				<h1 onClick={logouthandler} className="logout">
					{" "}
					Logout{" "}
				</h1>
			</div>
		</>
	);
}
export default Notes;
// const notes = [
// 	{ id: 1, title: "first note", body: "this is the body" },
// 	{ id: 2, title: "second note", body: "this is the body" },
// 	{ id: 3, title: "first note", body: "this is the body" },
// 	{ id: 4, title: "second note", body: "this is the body" },
// 	{ id: 5, title: "first note", body: "this is the body" },
// 	{ id: 6, title: "second note", body: "this is the body" },
// ];
