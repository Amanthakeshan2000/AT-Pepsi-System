import React from 'react'
import { FiLayers, FiSave } from 'react-icons/fi'
import topTost from '@/utils/topTost';

const ProposalEditHeader = () => {
    
    const handleClick = () => {
        topTost()
    };
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-light-brand" data-bs-toggle="offcanvas" data-bs-target="#proposalSent">
                <FiLayers size={16} className='me-2'/>
                <span>Save & Send</span>
            </a>
            <a href="#" className="btn btn-primary" onClick={handleClick}>
                <FiSave size={16} className='me-2'/>
                <span>Save</span>
            </a>
        </div>
    )
}

export default ProposalEditHeader