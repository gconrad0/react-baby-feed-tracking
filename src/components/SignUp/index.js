import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';


import {withFirebase} from '../Firebase/context';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div className='w-full max-w-sm m-auto'>
        <h1>Sign Up</h1>
        <SignUpForm/>
        <SignInLink/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isValid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div>
                <form onSubmit={this.onSubmit} className='bg-gray-700 rounded p-6'>
                    <div className='mb-2'>
                        <input
                            className='w-full p-2'
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Full Name"
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            className='w-full p-2'
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="email"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className='mb-2'>
                        <input className='w-full p-2'
                               name="passwordOne"
                               value={passwordOne}
                               onChange={this.onChange}
                               type="password"
                               placeholder="Password"
                        />
                    </div>
                    <div className='mb-6'>
                        <input
                            className='w-full p-2'
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button className={'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        + (isValid ? ' bg-gray-600 btnDisabled text-gray-700' : ' bg-green-600 hover:bg-green-500 text-white')}
                                disabled={isValid}
                                type="submit">Sign Up
                        </button>
                    </div>
                    <div>
                        {error && <p className={'mt-4 text-white'}>{error.message}</p>}
                    </div>
                </form>
            </div>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export {SignUpForm, SignUpLink, SignInLink};