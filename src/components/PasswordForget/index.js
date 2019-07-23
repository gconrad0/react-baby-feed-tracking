import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase/context';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div className='w-full max-w-sm m-auto'>
        <h1 className={'text-center text-3xl my-4'}>Reset Password</h1>
        <PasswordForgetForm/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email} = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
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
        const {email, error} = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmit} className='bg-gray-700 rounded p-6'>
                    <div className='mb-6'>
                        <input
                            className='w-full p-2'
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            className={'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-green-600 hover:bg-green-500 text-white'}
                            type="submit">Reset Password
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

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};