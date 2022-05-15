import React, { useContext, useState, useEffect } from "react";

import { ThemeContext } from "../context/ThemeContext";
import Button from '@mui/material/Button';

import "../App.css";

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import ThemeButton from '../context/ThemeButton';

import { collection , query, orderBy , onSnapshot, addDoc,limit, doc, deleteDoc, updateDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {db} from '../firebase';

function Recipes() {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const auth = getAuth();
    const user = auth.currentUser;
    const qFull=query(collection(db, `${user.email}`), orderBy('title'));
    const [recipesFull, setRecipesFull] = useState([]);
    const [limitList, setLimitList] = useState(5);

    useEffect(() => {
        onSnapshot(qFull,(snapshot)=>{
        setRecipesFull(snapshot.docs.map(doc=>({
            id: doc.id,
            item: doc.data(),
        })))
    })
    },[qFull]);

    let button;
    if (recipesFull.length > limitList) {
      button = <Button variant="contained" type='submit' onClick={() => {setLimitList(prev => prev + 5)}} > Load Next 5 Recipes ... </Button>;
    } else {
      button = '';
    }
    
    return (
        <>
            <div className={`bg ${darkMode ? "bg-dark" : "bg-light"}`}>
                <h1>A List Of Recipes </h1>
                <ThemeButton />
                <RecipeForm />
                <hr />
                <hr />
                <RecipeList limit={limitList} />
                {button}
            </div>
        </>
    )
}

export {Recipes};