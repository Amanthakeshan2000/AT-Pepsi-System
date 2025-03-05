import React from 'react'
import { customerProfileOption } from './CustomerSocalMedia'
import Dropdown from '@/components/shared/Dropdown'
import { FiUserPlus } from 'react-icons/fi'
import { teamMembersList } from '@/utils/fackData/teamMembersList'

const CustomerSocalFlower = () => {
    return (
        <div className="card stretch stretch-full">
            <div className="card-header">
                <h2 className="card-title">Suggestions</h2>
                <Dropdown dropdownItems={customerProfileOption} triggerPosition='25,25' dropdownMenuStyle={"wd-250"} />
            </div>
            <div className="card-body">
                {
                    teamMembersList.map(({ id, name, position, thumbnail }) => (
                        <div key={id} className="d-flex align-items-center mb-4">
                            <div className="avatar-image flex-shrink-0 me-3">
                                <img src={thumbnail} className="img-fluid" alt="" />
                            </div>
                            <div className="flex-grow-1">
                                <div>
                                    <h5 className="fs-13 mb-1">{name}</h5>
                                    <p className="fs-12 text-muted mb-0">{position}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 ms-2">
                                <a href="#" className="avatar-text avatar-md"><FiUserPlus className='align-middle' /></a>
                            </div>
                        </div>
                    ))
                }
            </div>
            <a href="#" className="ladda-button zoom-out" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Refresh Now">
                <span>Refresh</span>
                <span className="spinner"></span>
            </a>
        </div>
    )
}

export default CustomerSocalFlower