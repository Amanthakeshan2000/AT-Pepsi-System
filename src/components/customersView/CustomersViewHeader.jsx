import React from 'react'
import { FiEye, FiPlus, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import topTost from '@/utils/topTost';

const CustomersViewHeader = () => {
    const handleClick = () => {
        topTost()
    };
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-icon btn-light-brand" onClick={handleClick}>
                <FiStar size={16} />
            </a>
            <a href="#" className="btn btn-icon btn-light-brand">
                <FiEye size={16} className='me-2' />
                <span>Follow</span>
            </a>
            <Link to="/customers/create" className="btn btn-primary">
                <FiPlus size={16} className='me-2' />
                <span>Create Customer</span>
            </Link>
        </div>
    )
}

export default CustomersViewHeader