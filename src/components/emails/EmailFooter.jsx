import React from 'react'

const EmailFooter = () => {
    return (
        <div className="p-4 bg-white d-flex align-items-center justify-content-center justify-content-md-between">
            <div className="content-sidebar-footer wd-300 d-none d-md-block">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <h2 className="fs-11 tx-spacing-1 mb-0">Storage</h2>
                    <div className="fs-11 text-muted">
                        43.5GB used of <span className="fw-bold text-dark">100GB</span>
                    </div>
                </div>
                <div className="progress ht-3">
                    <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        aria-valuenow={43}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "43%" }}
                    />
                </div>
            </div>
            <div className="hstack gap-2 fs-11">
                <a href="#">Terms</a>
                <span className="wd-3 ht-3 bg-gray-500 rounded-circle" />
                <a href="#">Privacy</a>
                <span className="wd-3 ht-3 bg-gray-500 rounded-circle" />
                <a href="#">Policies</a>
            </div>
        </div>
    )
}

export default EmailFooter