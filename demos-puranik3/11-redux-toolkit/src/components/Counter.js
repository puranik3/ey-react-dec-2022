import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getValue, Actions } from '../slices/counter';

export default function Counter() {
    const dispatch = useDispatch();
    const value = useSelector( getValue );

    return (
        <div>
            Value: {value}
            <button onClick={() => dispatch( Actions.increment() )}>+</button>
            <button onClick={() => dispatch( Actions.decrement() )}>-</button>
        </div>
    )
}