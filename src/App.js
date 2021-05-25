import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase.js";
import Header from "./components/Header.jsx";
import Post from "./components/Post.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import "./App.css";

// Material UI Styling
function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}
const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

// Functionality
export default function App() {
	// Material UI
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	// State
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState(null);

	// Maintains Login
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// user has logged in...
				console.log(authUser);
				setUser(authUser);
			} else {
				// user has logged out...
				setUser(null);
			}
		});

		return () => {
			// perform some cleanup actions
			unsubscribe();
		};
	}, [user, username]);

	// Retrieve's collections from Firebase database
	useEffect(() => {
		db.collection("posts").onSnapshot((snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data(),
				}))
			);
		});
	}, []);

	// Sign Up Function and Update Profile
	const signUp = (event) => {
		event.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));
	};

	// Return of JSX Elements
	return (
		// Authentication Modal
		<div className="App">
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img
								className="header__headerImage"
								src="https://bit.ly/3faGfDW"
								alt=""
							/>
						</center>
						<Input
							type="text"
							placeholder="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							type="text"
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={signUp}>
							Sign Up
						</Button>
					</form>
				</div>
			</Modal>

			{/* Instagram Header */}
			<div className="app__header">
				<Header />
			</div>

			<Button onClick={() => setOpen(true)}>Sign Up</Button>

			{/* Instagram Post(s) */}
			{posts.map(({ id, post }) => (
				<Post
					key={id}
					username={post.username}
					caption={post.caption}
					imageURL={post.imageURL}
				/>
			))}
		</div>
	);
}
