import React, {Component} from 'react';

import {withFirebase} from '../Firebase/context';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {passwordOne} = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const {passwordOne, passwordTwo, error} = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <div className={''}>
                <form onSubmit={this.onSubmit} className='bg-gray-700 rounded p-6'>
                    <div className='mb-2'>
                        <input
                            className='w-full p-2'
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="New Password"
                        />
                    </div>
                    <div className='mb-8'>
                        <input
                            className='w-full p-2'
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm New Password"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            className={'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-green-600 hover:bg-green-500 text-white'}
                            type="submit">Create New Password
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

export default withFirebase(PasswordChangeForm);