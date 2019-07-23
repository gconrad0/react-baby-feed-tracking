import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';


const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
    <div className='w-full max-w-sm m-auto'>
        <h1 className={'text-center text-2xl my-4'}>User: <b>{authUser.email}</b></h1>
        <div className={'mb-8'}>
            <PasswordForgetForm/>
        </div>
        <div className={'mt-8'}>
            <PasswordChangeForm/>
        </div>
    </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);