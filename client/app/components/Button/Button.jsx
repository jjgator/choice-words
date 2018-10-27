import React from 'react'; 

const Button = (props) => (
  <button 
    className={props.type}
    onClick={props.onClick || null}
    disabled={
      props.disabled === undefined 
      ? false 
      : props.disabled === null || props.disabled === true
      ? true 
      : false}
    >
      {props.buttonText}
  </button>
)

export default Button;