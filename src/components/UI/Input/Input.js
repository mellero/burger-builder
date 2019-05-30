import React from 'react';
import classes from './Input.css';


const input = ( props ) => {
    let element = null;

    const inputClasses  = [classes.Element];
    if (props.invalid && props.modified) inputClasses.push(classes.Invalid)

    if (props.elementType === "input") {
        element = 
            <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                autoComplete="off" 
                value={props.value}
                onChange={props.changed} />
    } else if (props.elementType === "textarea") {
        element = 
            <textarea 
                className={inputClasses.join('')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element}
        </div>
    );
};

export default input;