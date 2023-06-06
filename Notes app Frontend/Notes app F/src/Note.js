import { useState, useEffect } from "react";
import "./Note.css";
import { Link, useNavigate, useParams } from "react-router-dom";
function Note() {
	const { id } = useParams();
	const [title, setTitle] = useState();
	const [body, setBody] = useState();
	const [loading, setIsLoading] = useState(1);
	const navigate = useNavigate();
	const DeleteHandler = async (e) => {
		e.preventDefault();
		let cookie = document.cookie;
		cookie = cookie.slice(10, cookie.length);
		let response = await fetch(`/api/notes/${id}/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": cookie,
			},
		});
		if (response.ok) navigate("/notes");
	};
	const SaveHandler = async (e) => {
		e.preventDefault();
		if (title === undefined || body === undefined) {
			navigate("/notes");
			return;
		}
		let cookie = document.cookie;
		cookie = cookie.slice(10, cookie.length);
		const data = {
			title: title,
			body: body,
		};
		let response = await fetch("/api/notes/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": cookie,
			},
			body: JSON.stringify(data),
		});

		if (response.ok) navigate("/notes");
	};
	const UpdateHandler = async (e) => {
		e.preventDefault();
		let cookie = document.cookie;
		cookie = cookie.slice(10, cookie.length);
		const data = {
			title: title,
			body: body,
		};
		let response = await fetch(`/api/notes/${id}/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": cookie,
			},
			body: JSON.stringify(data),
		});
		if (response.ok) navigate("/notes");
	};
	useEffect(() => {
		getNote();
	}, []);
	const getNote = async () => {
		if (id === "x") return;
		const response = await fetch(`/api/notes/${id}`);
		const data = await response.json();
		setTitle(data.title);
		setBody(data.body);
		setIsLoading(0);
	};
	const Arrow = "<";
	return (
		<>
			<div className="note">
				<form>
					<input
						type="text"
						name="title"
						value={title}
						placeholder="Title"
						onChange={(e) => setTitle(e.target.value)}
					></input>
					<textarea
						type="text"
						name="body"
						value={body}
						placeholder="Body of the Note"
						onChange={(e) => setBody(e.target.value)}
					></textarea>
					{id == "x" ? (
						<button className="btn-note" type="submit" onClick={SaveHandler}>
							Save
						</button>
					) : (
						<>
							<button
								className="btn-note"
								type="submit"
								onClick={UpdateHandler}
							>
								back
							</button>
						</>
					)}{" "}
				</form>
			</div>
		</>
	);
}
export default Note;

// const tx = document.getElementsByTagName("textarea");
// for (let i = 0; i < tx.length; i++) {
// 	tx[i].setAttribute(
// 		"style",
// 		"height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
// 	);
// 	tx[i].addEventListener("input", OnInput, false);
// }

// function OnInput() {
// 	this.style.height = 0;
// 	this.style.height = this.scrollHeight + "px";
// }
