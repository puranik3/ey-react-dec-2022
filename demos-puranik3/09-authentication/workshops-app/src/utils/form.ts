import { FormEvent } from 'react';

const handleSubmit = ( handler : Function, ...rest: any[] ) => {
    return ( event : FormEvent ) => {
        event.preventDefault();
        handler( rest );
    }
}

export {
    handleSubmit
};