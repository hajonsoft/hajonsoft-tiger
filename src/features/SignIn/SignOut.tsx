import React from 'react';
import {useHistory} from 'react-router'

const SignOut: React.FC = () => {

    const history = useHistory()
    history.push('/');

    return (
        <React.Fragment>
            You are now signed out.
        </React.Fragment >
    )
};

export default SignOut;