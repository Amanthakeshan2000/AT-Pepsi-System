import React from 'react'
import { Link } from 'react-router-dom'

const TabFooter = () => {
    return (
        <div className="col-lg-12">
            <div className="p-3 bg-soft-dark text-dark rounded d-flex align-items-center justify-content-between gap-4">
                <div className="fs-13 text-truncate-1-line">
                    <i className="feather-star me-2"></i>
                    <strong>Version 2.3.2 is out!</strong>
                    <span>Learn more about our news and schedule reporting.</span>
                </div>
                <div className="wd-100 text-end">
                    <Link to="" className="fs-13 text-primary">Learn More &rarr;</Link>
                </div>
            </div>
        </div>
    )
}

export default TabFooter