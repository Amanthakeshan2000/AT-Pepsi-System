import React from 'react'
import { FiLayers, FiUserPlus } from 'react-icons/fi'
import topTost from '@/utils/topTost';

const LeadsCreateHeader = () => {
  const handleClick = () => {
    topTost()
};

  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      <a href="#" className="btn btn-light-brand " onClick={handleClick}>
        <FiLayers size={16} className='me-2'/>
        <span>Save as Draft</span>
      </a>
      <a href="#" className="btn btn-primary " onClick={handleClick}>
        <FiUserPlus size={16} className='me-2'/>
        <span>Create Lead</span>
      </a>
    </div>
  )
}

export default LeadsCreateHeader