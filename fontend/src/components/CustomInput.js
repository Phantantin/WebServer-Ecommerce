import React from 'react'

const CustomInput = (props) => {
    const {type, name, placeholder, classname, value, onChange, onBulur, disabled} = props
  return (
    <div>
        <input 
            type={type}
            className={`form-control ${classname}`}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBulur}
            disabled={disabled}
            />
    </div>
  )
}

export default CustomInput