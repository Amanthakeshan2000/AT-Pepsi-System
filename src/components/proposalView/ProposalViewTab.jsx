import React from 'react'
import { FiAlignLeft, FiAlignRight, FiArrowLeft, FiBookOpen, FiCast, FiCheckCircle, FiCheckSquare, FiCopy, FiCrop, FiDollarSign, FiEdit, FiEye, FiLink, FiMail, FiPlus, FiSend, FiTrash2 } from 'react-icons/fi';
import Dropdown from '@/components/shared/Dropdown';

const moreAction = [
    { label: "View", icon: <FiEye /> },
    { label: "Copy", icon: <FiCopy /> },
    { label: "Attachment", icon: <FiLink /> },
    { label: "Make as Open", icon: <FiBookOpen /> },
    { label: "Make as Sent", icon: <FiSend /> },
    { label: "Make as Draft", icon: <FiEdit /> },
    { label: "Make as Revised", icon: <FiCrop /> },
    { label: "Make as Accepted", icon: <FiCheckCircle /> },
    { label: "Create New", icon: <FiPlus /> },
    { label: "Delete Proposal", icon: <FiTrash2 /> },
];
const fileType = [
    { label: "Draft", icon: <FiCheckSquare /> },
    { label: "Invoice", icon: <FiDollarSign /> },
    { label: "Estimate", icon: <FiCast /> },
];

const ProposalViewTab = () => {

    return (
        <div className="bg-white py-3 border-bottom rounded-0 p-md-0 mb-0">
            {/* <div className="d-md-none d-flex align-items-center justify-content-between">
                <a href="#" className="page-content-left-open-toggle">
                    <FiAlignLeft className='fs-20' />
                </a>
                <a href="#" className="page-content-right-open-toggle">
                    <FiAlignRight className='fs-20' />
                </a>
            </div> */}
            <div className="d-flex align-items-center justify-content-between w-100 overflow-auto">
                <div className="nav-tabs-wrapper page-content-left-sidebar-wrapper">
                    {/* <div className="d-flex d-md-none">
                        <a href="#" className="page-content-left-close-toggle">
                            <FiArrowLeft className='me-2' />
                            <span>Back</span>
                        </a>
                    </div> */}
                    <ul className="nav nav-tabs nav-tabs-custom-style flex-nowrap" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#proposalTab">Proposal</button>
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
                <div className="page-content-right-sidebar-wrapper">
                    {/* <div className="d-flex d-md-none">
                        <a href="#" className="page-content-right-close-toggle">
                            <FiArrowLeft className='me-2' />
                            <span>Back</span>
                        </a>
                    </div> */}
                    <div className="proposal-action-btn">
                        <div className="d-md-none d-lg-flex">
                            <a href="#" className="action-btn" data-bs-toggle="tooltip" title="Views Trackign">
                                <FiEye size={16} />
                            </a>
                        </div>
                        <div className="d-md-none d-lg-flex">
                            <a href="#" className="action-btn" data-bs-toggle="tooltip" title="Send to Email">
                                <FiMail size={16} />
                            </a>
                        </div>
                        <div className="d-md-none d-lg-flex">
                            <a href="/proposal/edit" className="action-btn" data-bs-toggle="tooltip" title="Edit Proposal">
                                <FiEdit size={16} />
                            </a>
                        </div>
                        <Dropdown
                            dropdownItems={fileType}
                            triggerPosition="0, 2"
                            triggerClass='action-btn dropdown-toggle c-pointer'
                            triggerIcon={"Convert"}
                            isAvatar={false}
                        />
                        <Dropdown
                            dropdownItems={moreAction}
                            triggerPosition="0, 2"
                            triggerClass='action-btn dropdown-toggle c-pointer'
                            triggerIcon={"More"}
                            isAvatar={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProposalViewTab