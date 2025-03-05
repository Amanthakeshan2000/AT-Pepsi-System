import React from 'react'
import { FiDelete, FiEdit, FiMoreHorizontal, FiMoreVertical, FiPlus, FiPrinter, FiTrash2, FiUserX } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import { Link } from 'react-router-dom'
import topTost from '@/utils/topTost'

const options = [
    { icon: <FiUserX />, label: "Make as Lost" },
    { icon: <FiDelete />, label: "Make as Junk" },
    { icon: <FiTrash2 />, label: "Delete as Lead" },
]
const LeadsViewHeader = () => {
    const handleClick = () => {
        topTost()
    };

    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-icon btn-light-brand">
                <FiPrinter size={16} strokeWidth={1.6} />
            </a>
            <Link to="/leads/create" className="btn btn-icon btn-light-brand">
                <FiEdit size={16} strokeWidth={1.6} />
            </Link>
            <Dropdown
                dropdownItems={options}
                dropdownAutoClose={"outside"}
                triggerPosition={"0, 10"}
                triggerClass='btn btn-icon btn-light-brand'
                triggerIcon={<FiMoreHorizontal size={16} />}
            />
            <a href="#" className="btn btn-primary" onClick={handleClick}>
                <FiPlus size={16} className='me-2' />
                <span>Make as Customer</span>
            </a>
        </div>
    )
}

export default LeadsViewHeader