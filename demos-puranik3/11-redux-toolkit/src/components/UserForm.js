import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getName, Actions } from '../slices/form';

export default function UserForm ( props ) {
    const dispatch = useDispatch();
    const name = useSelector( getName );

    const updateName = ( event ) => {
        dispatch(Actions.updateName({
            name: event.target.value
        }));
    };

    return (
        <div>
            {/* add code to dispatch action on change of name, and set value form state on update of name */}
            Name: <input type="text" id="name" onChange={updateName} value={name} />
            {name}
        </div>
    );
};