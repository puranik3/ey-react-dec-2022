import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleSubmit } from '../../../utils/form';
import { login } from '../../../services/auth';

const Login = () => {
    const { push } = useHistory();

    const emailRef = useRef<HTMLInputElement>( null );
    const passwordRef = useRef<HTMLInputElement>( null );

    const doLogin = async () => {
        const credentials = {
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
        };

        try {
            await login( credentials );
            push( '/workshops' );
        } catch( error ) {
            toast.error( (error as Error).message )
        }
    }

    return (
        <form onSubmit={handleSubmit(doLogin)}>
            <div className='form-group my-2'>
                <input type="email" placeholder="Your email" ref={emailRef} defaultValue="john.doe@example.com" />
            </div>
            <div className='form-group my-2'>
                <input type="password" ref={passwordRef} defaultValue="Password123#" />
            </div>
            <button className='btn btn-primary'>Login</button>
        </form>
    );
}
 
export default Login;