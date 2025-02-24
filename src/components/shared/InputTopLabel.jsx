import React from 'react'

const InputTopLabel = ({ label, info, type = "text", placeholder, isRequired, isOptional, className="mb-5" }) => {
    return (
        <div className={`${className}`}>
            <label className="form-label">
                {label}
                {isRequired ? <span className="text-danger">*</span> : ""}
                {isOptional ? <span className="fw-normal text-muted text-capitalize"> (Optional)</span> : ""}
            </label>
            <input type={type} className="form-control" placeholder={placeholder} />
            <small className="form-text text-muted">{info}</small>
        </div>
    )
}

export default InputTopLabel