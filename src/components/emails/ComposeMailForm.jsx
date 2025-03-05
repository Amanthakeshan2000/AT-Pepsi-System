import React, { useState } from 'react'
import EmailTagInput from './EmailTagInput'

const ComposeMailForm = () => {
    const [ccBccOpen, setCcBccOpen] = useState(false)
    return (
        <>
            <div className="position-relative border-bottom">
                <div className="px-2 d-flex align-items-center">
                    <div className="p-0 w-100">
                        <EmailTagInput placeholder={"TO"} />
                    </div>
                </div>
                <a href="#"
                    className="position-absolute top-50 end-0 translate-middle badge bg-gray-100 border border-gray-3 fs-10 fw-semibold text-uppercase text-dark rounded-pill c-pointer z-index-100"
                    onClick={() => setCcBccOpen(!ccBccOpen)}
                >
                    <span data-bs-toggle="tooltip" data-bs-trigger="hover" title="CC / BCC" style={{ fontSize: "9px !important" }}>CC / BCC</span>
                </a>
            </div>
            <div className={`border-bottom mail-cc-bcc-fields ${ccBccOpen ? "cc-bcc-show" : ""}`} >
                <div className="px-2 w-100 d-flex align-items-center border-bottom">
                    <EmailTagInput placeholder={"CC"} />
                </div>
                <div className="px-2 w-100 d-flex align-items-center">
                    <EmailTagInput placeholder={"BCC"} />
                </div>
            </div>
            <div className="px-3 w-100 d-flex align-items-center">
                <input className="form-control border-0 my-1 w-100 shadow-none" type="text" placeholder="Subject" />
            </div>
        </>
    )
}

export default ComposeMailForm