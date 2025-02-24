import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ComposeMailFooter from './ComposeMailFooter';
import ComposeMailForm from './ComposeMailForm';


const ComposeMailPopUp = () => {
    const [value, setValue] = useState('');

    return (
        <div className="modal fade-scale" id="composeMail" tabIndex="-1" aria-labelledby="composeMail" aria-hidden="true" data-bs-dismiss="ou">
            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div className="modal-content">
                    {/* <!--! BEGIN: [modal-header] !--> */}
                    <div className="modal-header">
                        <h2 className="d-flex flex-column mb-0">
                            <span className="fs-18 fw-bold mb-1">Compose Mail</span>
                            <small className="d-block fs-11 fw-normal text-muted">Compose Your Message</small>
                        </h2>
                        <a href="#" className="avatar-text avatar-md bg-soft-danger close-icon" data-bs-dismiss="modal">
                            <FiX className="text-danger" />
                        </a>
                    </div>
                    {/* <!--! BEGIN: [modal-body] !--> */}
                    <div className="modal-body p-0">
                        <ComposeMailForm />
                        <div className="editor w-100 m-0 email-editor">
                            <ReactQuill theme="snow" value={value} onChange={setValue} className=" border-0" />
                        </div>
                    </div>
                    {/* <!--! BEGIN: [modal-footer] !--> */}
                    <div className="modal-footer d-flex align-items-center justify-content-between email-modal">
                        <ComposeMailFooter />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComposeMailPopUp