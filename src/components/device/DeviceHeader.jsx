import React from 'react'
import { FiBarChart, FiFilter, FiPaperclip, FiPlus } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import { fileType, filterAction } from '../proposal/ProposalHeadr'
import { Link } from 'react-router-dom'
import PaymentStatistics from '../widgetsStatistics/PaymentStatistics';

const DeviceHeader = () => {
    return (
        <>
            <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                <a href="#" className="btn btn-icon btn-light-brand" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                    <FiBarChart size={16} />
                </a>
                <Dropdown
                    dropdownItems={filterAction}
                    triggerPosition={"0, 12"}
                    triggerIcon={<FiFilter size={16} strokeWidth={1.6} />}
                    triggerClass='btn btn-icon btn-light-brand'
                    isAvatar={false}
                />
                <Dropdown
                    dropdownItems={fileType}
                    triggerPosition={"0, 12"}
                    triggerIcon={<FiPaperclip size={16} strokeWidth={1.6} />}
                    triggerClass='btn btn-icon btn-light-brand'
                    iconStrokeWidth={0}
                    isAvatar={false}
                />
                <Link to="/payment/create" className="btn btn-primary">
                    <FiPlus size={16} className='me-2' />
                    <span>Create Device</span>
                </Link>
            </div>
            <div id="collapseOne" className="accordion-collapse collapse page-header-collapse payment-header-accordion">
                <div className="accordion-body pb-2">
                    <div className="row">
                        <PaymentStatistics />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeviceHeader