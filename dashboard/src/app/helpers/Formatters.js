import React from "react";
import NumberFormat from 'react-number-format'; 

export function CellNumberFormat(props) {
  const { inputRef, onChange, name, ...other } = props;
 
  return (
    <NumberFormat 
    {...other}
    name = {name}
    getInputRef={inputRef}
    allowEmptyFormatting={true}
    format="        +1 (###) ###-####" 
    mask="_" 
    type="tel"
    isNumericString ="true"
    displayType="input"
    // eslint-disable-next-line no-restricted-globals
    onValueChange={({ value: v }) => onChange({ target: { name, value: v } })}
  />
  );
};
