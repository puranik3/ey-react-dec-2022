import { useRef } from 'react';
import { login } from '../../../services/auth';
import { toast } from 'react-toastify';
import { handleSubmit } from '../../../utils/form';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>( null );
    const passwordRef = useRef<HTMLInputElement>( null );

    const doLogin = async () => {
        const credentials = {
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
        };

        try {
            const loginResponse = await login( credentials );
            console.log( loginResponse );
        } catch( error ) {
            toast.error( (error as Error).message )
        }
    }

    return (
        <form onSubmit={handleSubmit(doLogin)}>
            <div className='form-group my-2'>
                <input type="email" placeholder="Your email" ref={emailRef} />
            </div>
            <div className='form-group my-2'>
                <input type="password" ref={passwordRef} />
            </div>
            <button className='btn btn-primary'>Login</button>
        </form>
    );
}
 
export default Login;