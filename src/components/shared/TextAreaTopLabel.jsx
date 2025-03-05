import React from 'react'

const TextAreaTopLabel = ({ label, info, placeholder, className }) => {
    return (
        <div className={className}>
            <label className="form-label">{label}</label>
            <textarea className="form-control" cols={30} rows={10} placeholder={placeholder} defaultValue={""} />
            <small className="form-text text-muted">{info}</small>
        </div>
    )
}

export default TextAreaTopLabel