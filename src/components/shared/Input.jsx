import React from 'react'
import getIcon from '@/utils/getIcon'

const Input = ({ label, icon, type = "text", placeholder, labelId, name, centerLink }) => {
    return (
        <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
                <label htmlFor={labelId} className="fw-semibold">{label}: </label>
            </div>
            <div className="col-lg-8">
                <div className="input-group">
                    <div className="input-group-text">{getIcon(icon)}</div>
                    {/* {centerLink ? <div className="input-group-text"></div> : ""} */}
                    <input type={type} name={name} className="form-control" id={labelId} placeholder={placeholder} />
                </div>
            </div>
        </div>
    )
}

export default Input