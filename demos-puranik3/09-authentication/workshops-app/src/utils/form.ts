import { FormEvent } from 'react';

const handleSubmit = ( handler : Function ) => {
    return ( event : FormEvent ) => {
        event.preventDefault();
        handler();
    }
}

export {
    handleSubmit
};