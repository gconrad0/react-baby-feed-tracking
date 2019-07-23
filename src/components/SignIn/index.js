import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from '../Firebase/context';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div className='w-full max-w-sm m-auto'>
        <h1 className={'text-center text-3xl my-4'}>Sign In</h1>
        <SignInForm />
        <SignUpLink />
        <PasswordForgetLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
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
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div>
                <form onSubmit={this.onSubmit} className='bg-gray-700 rounded p-6'>
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
                               name="password"
                               value={password}
                               onChange={this.onChange}
                               type="password"
                               placeholder="Password"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button className={'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        + (isInvalid ? ' bg-gray-600 btnDisabled text-gray-700' : ' bg-green-600 hover:bg-green-500 text-white')}
                                disabled={isInvalid}
                                type="submit">Sign In</button>
                    </div>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export {SignInForm};