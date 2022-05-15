import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Button from '@mui/material/Button';

import './forms.css';

function SignInPage() {

    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const signin = e => {
        e.preventDefault();
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                localStorage.setItem('logged', true);
                navigate('../auth/recipes');
            })
            .catch(err => setError(err.message))
        setEmail('');
        setPassword('');
    }

    const googleSignIn = (e) => {
        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
        .then((result) => {
            navigate('../auth/recipes');
        })
    }

    return (
        <div className='center'>
            <div className='auth'>
                <h1>Sign In</h1>
                {error && <div className='auth__error'>{error}</div>}
                <form onSubmit={signin} name='signin_form'>
                <input 
                    type='email' 
                    value={email}
                    placeholder="Enter your email"
                    required
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    value={password} 
                    required
                    placeholder='Enter your password'
                    onChange={e => setPassword(e.target.value)}
                />
                <button type='submit'>Sign In</button>
                </form>
                <span>
                Sign In via Google account: &nbsp;  
                <Button variant="contained" type='submit' onClick={googleSignIn} > Sign In </Button>
                </span>
            </div>
        </div>
    )
}

export {SignInPage};