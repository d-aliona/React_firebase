import React, {useState, useEffect} from 'react';

import { collection , query, orderBy, where, onSnapshot, limit, doc, deleteDoc, updateDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {db} from '../firebase';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function RecipeList(props) {
    const auth = getAuth();
    const user = auth.currentUser;
    const [recipes, setRecipes] = useState([]);
    const [filterValue, setFilterValue] = useState('all');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [updatedRecipe, setUpdatedRecipe] = useState(null);
    let q;

    if (filterValue === 'all') {
        q=query(collection(db, `${user.email}`), orderBy('title'), limit(props.limit)); 
    } else if (filterValue === 'cooked') {
        q = query(collection(db, `${user.email}`), where("cooked", "==", true)); 
    } else {
        q = query(collection(db, `${user.email}`), where("cooked", "==", false)); 
    }
    
    useEffect(() => {
        onSnapshot(q,(snapshot)=>{
        setRecipes(snapshot.docs.map(doc=>({
            id: doc.id,
            item: doc.data(),
        })))
    })
    },[q]);

    function handlerRemoveRecipe(index) {
        deleteDoc(doc(db,`${user.email}`, index))
    }

    function handlerEditRecipe(title, content, index) {
        const documentRef = doc(db, `${user.email}`, index);

        updateDoc(documentRef, {
            title: title,
            recipe: content
        });
    }

    function filterList(e) {
        setFilterValue(e.target.value);
    }

    const recipeItems = recipes.map((recipe, index) => {
        const isCurrentBeingUpdated = updatedRecipe === index;
                        
        const saveOrEdit = (e) => {
            e.preventDefault();

            setUpdatedRecipe(isCurrentBeingUpdated ? null : index);
            setName(recipe.item.title);
            setDescription(recipe.item.recipe);

            if (isCurrentBeingUpdated) {
                handlerEditRecipe(name, description, recipe.id)
            } else {
                handlerEditRecipe(recipe.item.title, recipe.item.recipe, recipe.id)
            }
        }

        const deleteOrCancel = (e) => {
            e.preventDefault();

            if (isCurrentBeingUpdated) {
                handlerEditRecipe(recipe.item.title, recipe.item.recipe, recipe.id);
                setUpdatedRecipe(isCurrentBeingUpdated ? null : index);
            } else {
                handlerRemoveRecipe(recipe.id);
            }
        }

        const onChange = (e) => {
            const documentRef = doc(db, `${user.email}`, recipe.id);
            
            updateDoc(documentRef, {
                cooked: e.target.checked
            });
        }
         
        return (
        <li key={index} >
            <b>
                {isCurrentBeingUpdated ? (
                <TextField 
                    id="standard-basic"  variant="standard" 
                    type='text'
                    name='title'
                    className='bg-light'
                    defaultValue={recipe.item.title}
                    placeholder='Type the cooking title here'
                    onChange={(e) => setName(e.target.value)} 
                />) : (
                    recipe.item.title
                )}
            </b> 
            &nbsp; &nbsp;       
            <input 
                type="checkbox"
                checked={recipe.item.cooked}
                onChange={onChange}
            />
            <p>{isCurrentBeingUpdated ? (
                <TextField 
                    id="outlined-multiline-static"
                    multiline
                    rows={3}
                    className='bg-light'
                    name='content'
                    defaultValue={recipe.item.recipe}
                    placeholder='Type the cooking recipe here'
                    onChange={(e) => setDescription(e.target.value)} 
                />) : ( recipe.item.recipe )} 
            </p>

            <ButtonGroup disableElevation variant="contained" color='secondary' size="small">
                <Button onClick={saveOrEdit}>
                    {isCurrentBeingUpdated ? "Save" : "Edit"}
                </Button>
                <Button onClick={deleteOrCancel}> 
                    {isCurrentBeingUpdated ? "Cancel" : "Delete"}
                </Button>
            </ButtonGroup>
            <hr />
        </li>)
    })
    
    return (
        <>
           <h3>
           <form>
                <label >The list of recipes: &nbsp; </label>
                <select name="dishes" id="dishes" onChange={filterList}>
                    <option value="all">All</option>
                    <option value="cooked">Cooked</option>
                    <option value="unCooked">Uncooked</option>
                </select>
            </form> 
            </h3>
           <ol>
               {recipeItems}
           </ol>
        </>
    )
}

export default RecipeList;