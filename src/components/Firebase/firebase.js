import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyDRrjtu3ofVbUflbDgunVNFyctGDw8OwAA",
    authDomain: "react-baby-feeding.firebaseapp.com",
    databaseURL: "https://react-baby-feeding.firebaseio.com",
    projectId: "react-baby-feeding",
    storageBucket: "",
    messagingSenderId: "250094831011",
    appId: "1:250094831011:web:3a32e955b0dec6c7"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();

    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;