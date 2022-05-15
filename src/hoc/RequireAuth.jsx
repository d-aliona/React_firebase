import { Navigate } from "react-router-dom";

import {getAuth} from 'firebase/auth';

const RequireAuth = ({children}) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
        return <Navigate to='/' />
    }

    return children;
}

export {RequireAuth}