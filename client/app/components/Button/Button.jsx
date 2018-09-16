import React from 'react'; 

const Button = (props) => (
  <button className={props.type}>{props.buttonText}</button>
)

export default Button;