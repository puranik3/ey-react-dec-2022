import { ReactNode } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuthentication } from '../../services/auth';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

type Props = {
    children: ReactNode,
    path: string,
    roles: string[]
}

const PrivateRoute = ( { children, roles, ...rest } : Props  ) => {
    const { role, email } = useAuthentication();

    return (
        <Route {...rest}>
            {
                !email && (
                    <Redirect to="/login" />
                )
            }
            {
                email && roles.includes( role ) && (
                    children
                )
            }
            {
                email && !roles.includes( role ) && (
                    <PageNotFound />
                )
            }
        </Route>
    );
};
 
export default PrivateRoute;