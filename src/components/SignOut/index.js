import React from 'react';

import { withFirebase } from '../Firebase/context';

const SignOutButton = ({ firebase }) => (
    <button className={'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-green-600 hover:bg-green-500 text-white'} type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);