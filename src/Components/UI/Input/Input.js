import React from 'react';

import classes from "./Input.css";


const Input = (props) => {
    let inputClasses = [classes.Input];

    if(!props.valid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    let inputEl;
    switch (props.elementType) {
        case 'textarea':
            inputEl = <textarea className={inputClasses.join(' ')} value={props.value} {...props.elementConfig} onChange={props.changed}/>
            break;
        case 'select':
            inputEl = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select> 
            )  
            break;
        default:
            inputEl = <input className={inputClasses.join(' ')} value={props.value} {...props.elementConfig} onChange={props.changed}/>
            break;
    }
    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    )
}
export default Input;