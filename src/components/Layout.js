import { NavLink, Outlet} from "react-router-dom";
import {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

const Layout = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setCurrentUser(user)
        })
      }, [])
    
    return (
        <>
            <header className='header'>
                <NavLink className='header-ref' to="/"> Home </NavLink>
                <NavLink className='header-ref' to={currentUser ? '' : "/signup"}> {!currentUser ? 'Sign Up' : `` } </NavLink>
                <NavLink className='header-ref' to={currentUser ? '' : "/signin"}> {!currentUser ? 'Sign In' : ``} </NavLink>
                <NavLink className='header-ref' to={!currentUser ? '' : "/auth/signout"}> {currentUser ? 'Sign Out' : ''} </NavLink>
                <NavLink className='header-ref' to={!currentUser ? '' : "/auth/recipes"}> {!currentUser ? '' : `Your email: ${currentUser.email}` } </NavLink>
            </header>
            <Outlet />
        </>
    )
}

export {Layout}