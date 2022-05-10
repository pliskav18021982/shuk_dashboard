import React from 'react'
import './checkbox.css'
function Checkbox({label, id, name, inputClassName, labelClassName}) {
  return (
    <> 
      <label for={name} className={labelClassName}>
        <input type="checkbox" className={inputClassName} id={id} name={name} />
        {label}
      </label>
    </>
  );
}

export default Checkbox