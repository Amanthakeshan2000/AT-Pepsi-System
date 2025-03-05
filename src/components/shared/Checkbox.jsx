import React from 'react'

const Checkbox = ({ id, name, checked, className, labelClassName, ...props }) => {
    return (
        <div className={`custom-control custom-checkbox ${className}`}>
            <input type="checkbox" className="custom-control-input" id={id} defaultChecked={checked} {...props} />
            <label className={`custom-control-label c-pointer ${labelClassName}`} htmlFor={id}>{name}</label>
        </div>
    )
}

export default Checkbox