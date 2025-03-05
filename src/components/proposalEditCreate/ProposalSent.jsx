import React, { useState } from 'react'
import EmailTagInput from '../emails/EmailTagInput'
import ReactQuill from 'react-quill'
import { confirmDelete } from '@/utils/confirmDelete';

const ProposalSent = () => {
    const [value, setValue] = useState('');

    const handleDeleteMessage = (e) => {
        e.preventDefault()
        confirmDelete();
    };

    return (
        <div className="offcanvas offcanvas-end proposal-sent" tabIndex={-1} id="proposalSent">
            <div className="offcanvas-header ht-80 px-4 border-bottom border-gray-5">
                <div>
                    <h2 className="fs-16 fw-bold text-truncate-1-line">Sent Proposal</h2>
                    <small className="fs-12 text-muted">Sent proposal to your client's</small>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="py-3 px-4 d-flex justify-content-between align-items-center border-bottom border-bottom-dashed border-gray-5 bg-gray-100">
                <div>
                    <span className="fw-bold text-dark">Date:</span>
                    <span className="fs-11 fw-medium text-muted">25 MAY, 2023</span>
                </div>
                <div>
                    <span className="fw-bold text-dark">Proposal No:</span>
                    <span className="fs-12 fw-bold text-primary c-pointer">#NXL369852</span>
                </div>
            </div>
            <div className="offcanvas-body">
                <div className="form-group mb-4">
                    <label className="form-label">From: <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" defaultValue="wrapcode.info@gmail.com" placeholder="Clients..." readOnly required />
                </div>
                <div className="form-group mb-4">
                    <label className="form-label">To: <span className="text-danger">*</span></label>
                    <EmailTagInput placeholder={"To..."} className="border" />
                </div>
                <div className="form-group mb-4">
                    <label className="form-label">Subject: <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Subject..." required />
                </div>
                <div className="form-group mb-4">
                    <label className="form-label">URL: </label>
                    <input type="url" className="form-control" placeholder="URL..." />
                </div>
                <div className="form-group ">
                    <label className="form-label">Messages:</label>
                    <ReactQuill theme="snow" value={value} onChange={setValue} className="" />
                </div>
            </div>
            <div className="px-4 gap-2 d-flex align-items-center ht-80 border border-end-0 border-gray-2">
                <a href="#" className="btn btn-primary w-50" onClick={(e)=>handleDeleteMessage(e)}>Sent Proposal</a>
                <a href="#" className="btn btn-danger w-50" data-bs-dismiss="offcanvas">Cancel</a>
            </div>
        </div>
    )
}

export default ProposalSent