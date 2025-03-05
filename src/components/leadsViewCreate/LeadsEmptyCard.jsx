import React from 'react'
import { FiPlus } from 'react-icons/fi'

const LeadsEmptyCard = ({title, description}) => {
    return (
        <div className="card card-body">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 315px)" }}>
                <div className="text-center">
                    <h2 className="fs-16 fw-semibold">{title}</h2>
                    <p className="fs-12 text-muted">{description}</p>
                    <a href="#" className="avatar-text bg-soft-primary text-primary mx-auto" data-bs-toggle="tooltip" title="Create Proposals">
                        <FiPlus size={16} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LeadsEmptyCard