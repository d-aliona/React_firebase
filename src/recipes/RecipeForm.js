import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {getAuth} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';

function RecipeForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    
    function handlerSubmit(e) {
        e.preventDefault();
        
        if (title && content) {
            addDoc(collection(db, `${user.email}`), {
                title: title,
                recipe: content,
                cooked: false
            });  

            setTitle('');
            setContent('');
        };
    }

    return (
        <>
            <h3> Add your own recipe to your list</h3>
            <form onSubmit={handlerSubmit}>
                Cooking Title 
                <br />
                <TextField id="standard-basic"  variant="standard" 
                    type='text'
                    className='bg-light'
                    name='title'
                    value={title}
                    placeholder='Type the cooking title here'
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <br />
                <p className='backdown'> Recipe </p>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    className='bg-light'
                    name='content'
                    value={content}
                    placeholder='Type the recipe here'
                    onChange={(e) => setContent(e.target.value)}
                />
                <br /><br />
                <Button variant="contained" type='submit'>Add a recipe </Button>
            </form>
        </>
    )
}

export default RecipeForm;