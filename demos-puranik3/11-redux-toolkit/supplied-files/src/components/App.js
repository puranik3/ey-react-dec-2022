import React from 'react';
import Counter from './Counter';
import UserForm from './UserForm';

export default function App( props ) {
    return (
        <React.Fragment>
            <Counter />
            <UserForm />
        </React.Fragment>
    );
}