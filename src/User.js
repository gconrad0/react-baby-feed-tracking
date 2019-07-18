import React from 'react'
import firebase from 'firebase'


class User extends React.Component {


    constructor() {
        super();
        this.state = {
            email: '',
            fullname: ''
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addUser = e => {
        e.preventDefault();

        const firebaseConfig = {
            apiKey: "AIzaSyDRrjtu3ofVbUflbDgunVNFyctGDw8OwAA",
            authDomain: "react-baby-feeding.firebaseapp.com",
            databaseURL: "https://react-baby-feeding.firebaseio.com",
            projectId: "react-baby-feeding",
            storageBucket: "",
            messagingSenderId: "250094831011",
            appId: "1:250094831011:web:3a32e955b0dec6c7"
        };
// Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();

        const userRef = db.collection('users').add({
            fullname: this.state.fullname,
            email: this.state.email
        });

        this.setState({
            fullname: '',
            email: ''
        });
    };

    render() {
        return (
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    onChange={this.updateInput}
                    value={this.state.fullname}

                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.updateInput}
                    value={this.state.email}
                />
                <button
                    type="submit">Submit
                </button>
            </form>
        );
    }
}

export default User;
