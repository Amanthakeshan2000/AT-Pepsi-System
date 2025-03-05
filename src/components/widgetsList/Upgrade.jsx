import React from 'react'

const Upgrade = () => {
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <div className="p-4 bg-soft-warning rounded-3">
                        <p className="fs-12 text-dark text-truncate-2-line">Clear memory <strong>46.94 MB</strong> from temporary files. By clearing memory storage reduce loads.</p>
                        <a href="#" className="fs-10 text-uppercase text-danger d-flex align-items-center">
                            <span className="wd-10 ht-10 d-flex align-items-center justify-content-center bg-danger text-white me-2 rounded-circle">
                                <i className="feather feather-x fs-8" />
                            </span>
                            <span>Clear Memory</span>
                        </a>
                    </div>
                    <div className="text-center">
                        <div className="wd-150 mx-auto my-4">
                            <img src="/images/general/rocket.png" className="img-fluid" alt="img" />
                        </div>
                        <div className="fw-bolder text-uppercase text-dark text-spacing-1">Need more space?</div>
                        <p className="px-5 fs-12 text-muted text-truncate-2-line">Get more space by upgrading your storage plan today! It's easy to upgrade by click the upgrade button.</p>
                        <a href="#" className="btn btn-primary mt-2 d-inline-block mx-auto">Upgrade Now</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Upgrade