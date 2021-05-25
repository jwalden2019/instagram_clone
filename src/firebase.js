import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAmofX4kRccYfJxpN3R1Ty1IwyAhHEiEO8",
	authDomain: "instagram-clone-jwalden.firebaseapp.com",
	databaseURL: "https://instagram-clone-jwalden-default-rtdb.firebaseio.com",
	projectId: "instagram-clone-jwalden",
	storageBucket: "instagram-clone-jwalden.appspot.com",
	messagingSenderId: "1034470773357",
	appId: "1:1034470773357:web:cd90faff727a57b2ae2564",
	measurementId: "G-XJKGRDXLCV",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
