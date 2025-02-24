import React from 'react'
import { FiMessageCircle, FiX } from 'react-icons/fi'

const CallHeader = () => {
    return (
        <div className="d-flex align-items-center justify-content-between px-4 py-3">
            <div className="d-flex align-items-center justify-content-center content-sub-header-left chat-calling-info">
                <div className="avatar-image me-3">
                    <img src="/images/avatar/10.png" className="img-fluid" alt="image" />
                </div>
                <div>
                    <a href="#" className="fs-13 fw-bold d-flex align-items-center">Erna Serpa</a>
                    <div className="text typing">
                        <div className="ringing active">
                            <div className="d-flex align-items-baseline">
                                <div className="fs-11 fw-semibold text-success">Contacting</div>
                                <div className="wave">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                        </div>
                        <div className="fs-12 fw-medium text-success timetracker">00:00:00</div>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <a href="#" className="avatar-text avatar-md me-2 d-none d-lg-flex chat-message-sidebar-toggle" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Text Message">
                    <FiMessageCircle size={11} strokeWidth={1.6} />
                </a>
                <a href="#" className="avatar-text avatar-md bg-soft-danger d-flex close-icon call-ended" data-bs-dismiss="modal">
                    <FiX size={11} strokeWidth={1.6} className='text-danger' />
                </a>
            </div>
        </div>
    )
}

export default CallHeader