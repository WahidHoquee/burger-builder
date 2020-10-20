import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
    let modifiedIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
        return [...Array(props.ingredients[ingredient])]
        .map((_,index)=>{
            return <BurgerIngredient key={ingredient+index} type={ingredient}/>
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(modifiedIngredients.length === 0){
        modifiedIngredients = <p>Please Add Some Ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="breadTop"/>
            {modifiedIngredients}
            <BurgerIngredient type="breadBottom"/>
        </div>
    )
}
export default Burger;