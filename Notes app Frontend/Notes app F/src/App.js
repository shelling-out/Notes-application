import Notes from "./Notes";
import Note from "./Note";
import Login from "./Login";
import Register from "./Register";
import _404 from "./_404";
import { useState } from "react";
import {
	HashRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/notes" element={<Notes></Notes>}></Route>
					<Route path="/notes/:id" element={<Note></Note>}></Route>
					<Route exact path="/" element={<Login></Login>}></Route>
					<Route exact path="/register" element={<Register></Register>}></Route>
					<Route path="*" element={<_404></_404>}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;

// notes page
// note page for PUT request and delete and get
// create note page for post
// login page
// register page
