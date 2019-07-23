import React from 'react';
import {Link} from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';


const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <div>
        <ul className='navigation flex justify-around p-2 bg-gray-400'>
            <li>
                <Link className='p-4 hover:bg-blue-100' to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link className='p-4 hover:bg-blue-100' to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link className='p-4 hover:bg-blue-100' to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <ul className='navigation flex justify-around p-2 bg-gray-400'>
            <li>
                <Link className='p-4 hover:bg-blue-100' to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link className='p-4 hover:bg-blue-100' to={ROUTES.LANDING}>Landing</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;