import React from 'react'
import { FiLayers } from 'react-icons/fi'

const ProposalViewHeader = () => {
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-light-brand" data-bs-toggle="offcanvas" data-bs-target="#proposalSent">
                <FiLayers size={16} className='me-2'/>
                <span>Save & Send</span>
            </a>
            <a href="#" className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#proposalSent">Sent Proposal</a>
        </div>
    )
}

export default ProposalViewHeader