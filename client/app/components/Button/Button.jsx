import React from 'react'; 

const Button = (props) => (
  <button 
    className={props.type}
    disabled={
      props.disabled === undefined 
      ? false 
      : props.disabled === null 
      ? true 
      : false}
    >
      {props.buttonText}
  </button>
)

export default Button;