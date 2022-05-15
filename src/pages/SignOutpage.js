import { signOut } from 'firebase/auth'; 
import { auth } from '../firebase';

import {useNavigate} from 'react-router-dom'

function SignOutPage() {
    const navigate = useNavigate();
    
    const signout = () => {
        signOut(auth);
        navigate('/');
    }

    return (
        <button onClick={signout}>Sign Out</button>
    )    
}

export {SignOutPage}