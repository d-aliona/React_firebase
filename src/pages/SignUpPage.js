import {useState} from 'react';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Button from '@mui/material/Button';
import './forms.css';

function SignUpPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== ''){
            if (password !== confirmPassword) {
                isValid = false
                setError('Passwords does not match')
            }
        }
        return isValid
    }

    const register = e => {
        e.preventDefault();
        setError('');
        if(validatePassword()) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('../auth/recipes');
            })
            .catch(err => setError(err.message))
        }
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const googleRegister = (e) => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
        .then((result) => {
            navigate('../auth/recipes');
        })
    }

    return (
        <div className='center'>
        <div className='auth'>
            <h1>Register</h1>
            {error && <div className='auth__error'>{error}</div>}
            <form onSubmit={register} name='registration_form'>
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
            <input 
                type='password'
                value={confirmPassword} 
                required
                placeholder='Confirm password'
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button type='submit'>Register</button>
            </form>
            <span>
            Register via Google account: &nbsp; 
            <Button variant="contained" type='submit' onClick={googleRegister} > Register </Button> 
            </span>
        </div>
        </div>
    )
}

export {SignUpPage};