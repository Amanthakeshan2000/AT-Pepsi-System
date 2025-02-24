import React from 'react'

const LeadsViewTab = () => {
    return (
        <div className="bg-white py-3 border-bottom rounded-0 p-md-0 mb-0">
            <div className="d-md-none d-flex">
                <a href="#" className="page-content-left-open-toggle">
                    <i className="feather-align-left fs-20"></i>
                </a>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <div className="nav-tabs-wrapper page-content-left-sidebar-wrapper">
                    <div className="d-flex d-md-none">
                        <a href="#" className="page-content-left-close-toggle">
                            <i className="feather-arrow-left me-2"></i>
                            <span>Back</span>
                        </a>
                    </div>
                    <ul className="nav nav-tabs nav-tabs-custom-style" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profileTab">Profile</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#proposalTab">Proposal</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tasksTab">Tasks</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#notesTab">Notes</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#commentTab">Comments</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeadsViewTab